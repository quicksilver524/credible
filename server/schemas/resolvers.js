const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
const { User, Thought } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log("user:", context.user);
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("thoughts")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("thoughts")
        .populate("friends");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      console.log(user);
      if (!user.timeIn) {
        user.points += 5;
      } else {
        const lastTimeIn = new Date(user.timeIn).getTime();
        const now = Date.now();
        const diff = Math.abs(now - lastTimeIn) / 36e5;
        if (diff > 5) {
          user.points += 5;
        } else {
          user.points += 2;
        }
        console.log(diff);
      }
      user.timeIn = Date.now();
      await user.save();
      return { token, user };
    },
    addThought: async (parent, args, context) => {
      if (context.user) {
        let user = await User.findById(context.user._id);
        if (user.points <= 0) {
          throw new ForbiddenError("Not Enough Credits to Post");
        }
        const thought = await Thought.create({
          ...args,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          //after created a post,lose 1 ppoint
          { $push: { thoughts: thought._id }, $inc: { points: -1 } },
          { new: true }
        );
        return thought;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    likeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        // add user who clicled like
        const thought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $addToSet: { likes: context.user._id } },
          { new: true, runValidators: true }
        );

        // add 1 point
        await User.findOneAndUpdate(
          { username: thought.username },
          // liked post，point + 1
          { $inc: { points: 1 } }
        );

        return thought;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    dislikeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $addToSet: { dislikes: context.user._id } },
          { new: true, runValidators: true }
        );
        // points - 1
        await User.findOneAndUpdate(
          { username: thought.username },
          // user:point - 1
          { $inc: { points: -1 } },
          { new: true }
        );
        return thought;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addReaction: async (parent, { thoughtId, reactionBody }, context) => {
      if (context.user) {
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $push: {
              reactions: { reactionBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedThought;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    checkout: async(parent, args, context) => {
      const url = new URL(context.headers.referer || context.headers.origin).origin;
      //generate product id
      const product = await stripe.products.create({
        name: "credits",
        description: args.credits || "credits",
        images: [`${url}/static/media/gold2.bde56015.png`]
      });

      //generate price id using the product id
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: args.price * 100,
        currency: 'usd',
      });

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: price.id,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${url}/checkoutsuccess?success=true`,
        cancel_url: `${url}/checkoutsuccess?canceled=true`,
      });
      return{ session: session.id };
    },
    // 充值
    recharge: async (parent, {point}, context) => {
      if (context.user) {
console.log(point);
        // points 加 point
        const updatedUser = await User.findOneAndUpdate(
            {_id: context.user._id},
            {$inc: {points: point}},
            {new: true}
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;
