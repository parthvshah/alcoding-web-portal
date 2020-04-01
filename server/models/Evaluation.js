const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  usn: {
    type: String,
    default: "",
    required: true
  },
  name: {
    firstName: {
      type: String,
      default: "",
      required: true
    },
    lastName: {
      type: String,
      default: ""
    }
  },
  basicInfo: {
    // Contains mutable info
    email: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    dob: {
      type: Date,
      default: Date.now()
    }
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { strict: false, timestamps: true });


module.exports = mongoose.model('Evaluation', EvaluationSchema);
