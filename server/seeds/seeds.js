const faker = require('faker');

const db = require('../config/connection');
const { Thought, User } = require('../models');
const bcrypt = require('bcrypt');

db.once('open', async () => {
    await Thought.deleteMany({});
    await User.deleteMany({});

    // create user data
    const userData = [];

    for (let i = 0; i < 50; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        //const password = faker.internet.password();
        const password = 'password';
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //set default password for every user, and password is :'password'

        userData.push({ username, email, password:hashedPassword, points: 10 });
    }

    const createdUsers = await User.collection.insertMany(userData);

    console.log(createdUsers);

    // create friends
    for (let i = 0; i < 30; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];

        let friendId = userId;

        while (friendId === userId) {
            const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
            friendId = createdUsers.ops[randomUserIndex];
        }

        await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
    }

    // create thoughts
    let createdThoughts = [];
    for (let i = 0; i < 100; i += 1) {
        const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username, _id: userId } = createdUsers.ops[randomUserIndex];

        const createdThought = await Thought.create({ thoughtText, username });

        const updatedUser = await User.updateOne(
            { _id: userId },
            { $push: { thoughts: createdThought._id } }
        );

        createdThoughts.push(createdThought);
    }

    // create reactions
    for (let i = 0; i < 100; i += 1) {
        const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username } = createdUsers.ops[randomUserIndex];

        const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
        const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

        await Thought.updateOne(
            { _id: thoughtId },
            { $push: { reactions: { reactionBody, username } } },
            { runValidators: true }
        );
    }
    // create likes
    for (let i = 0; i < 100; i += 1) {

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];

        const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
        const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

        await Thought.updateOne(
            { _id: thoughtId },
            { $push: { likes: userId._id } } ,
            { runValidators: true }
        );
    }

     // create likes for user
     for (let i = 0; i < 100; i += 1) {

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];

        const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
        const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

        await User.updateOne(
            { _id: userId },
            { $push: { likes: thoughtId } } ,
            { runValidators: true }
        );
    }


    console.log('all done!');
    process.exit(0);
});