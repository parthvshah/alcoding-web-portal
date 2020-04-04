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
  assignment:{
    type: String,
    default: "",
    required: true
  },
  section: {
    type: String,
    default: "",
    required: true
  },
  subject: {
    type: String,
    default: "",
    required: true
  }
  
}, { strict: false, timestamps: true });


module.exports = mongoose.model('Evaluation', EvaluationSchema);
