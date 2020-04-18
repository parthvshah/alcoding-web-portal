const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AssignmentSchema = new mongoose.Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  uniqueID: {
    type: String,
    required: true,
  },
  type: { // MCQ, Quiz, Code
    type: String,
    // required: true,
  },
  details: {
    type: String,
  },
  maxMarks: {
    type: Number,
  },
  resourcesUrl: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  duration: {
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  submissions: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    file: {
      type: Schema.Types.ObjectId,
      ref: 'Files',
    },
    marksObtained: {
      type: Number,
      default: -1
    }
  }],
  comments: [{
    text: {
      type: String
    },
    username: {
      type: String
    },
    createdOn: {
      type: Date,
      default: Date.now()
    }

  }],
  POC: { // Point Of Contact
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
AssignmentSchema.index({name:"text",details:"text","comments.text":"text"});
module.exports = mongoose.model('Assignment', AssignmentSchema);
