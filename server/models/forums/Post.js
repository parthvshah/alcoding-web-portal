const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comments: [{
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    votes: {
      type: Number,
      default: 0
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    badge:{
      type: Number,
      default: 0
    }
  }],
  votes: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Post', PostSchema);
