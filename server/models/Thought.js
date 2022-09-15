const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});
thoughtSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});
thoughtSchema.virtual('dislikeCount').get(function() {
  return this.dislikes.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
