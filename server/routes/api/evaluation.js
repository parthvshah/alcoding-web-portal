const User = require('../../models/User');
const Evaluation = require('../../models/Evaluation');
var requireRole = require('../../middleware/Token').requireRole;
var verifyUser = require('../../middleware/Token').verifyUser;

module.exports = (app) => {
  app.post('/api/evaluation', (req, res) => {
    var usn = req.body.usn;
    var section = req.body.section;
    var subject = req.body.subject;
    var assignment = req.body.assignment;

    //Verify that userID is present as a parameter
    if (!usn) {
      return res.status(400).send({
        success: false,
        message: 'Error: usn parameter cannot be blank'
      });
    }
    if (!section) {
      return res.status(400).send({
        success: false,
        message: 'Error: section parameter cannot be blank'
      });
    }
    if (!subject) {
      return res.status(400).send({
        success: false,
        message: 'Error: subject parameter cannot be blank'
      });
    }
    if (!assignment) {
      return res.status(400).send({
        success: false,
        message: 'Error: assignment parameter cannot be blank'
      });
    }
    
    const newEval = new Evaluation();
    newEval.usn = usn;
    newEval.section = section;
    newEval.subject = subject;
    newEval.assignment = assignment;
    newEval.save((err, evalObj) => {
      if (err) {
        console.log("Error: "+err);
        return res.status(500).send({
          success: false,
          message: "Save failed.",
          error: err.message
        });
      }
      else {
        console.log("New eval saved.");
        return res.status(200).send({
          success: true,
          message: "New eval saved."
        });
      }
      
    });
    

  });




  //Second API to manage teacher submission


  app.post('/api/evaluation/teacher', (req, res) => {
    var searchUSN = req.body.searchUSN;
    var sectionTeacher = req.body.sectionTeacher;
    var subjectTeacher = req.body.subjectTeacher;
    var sampleAns = req.body.sampleAns;
    var myquery = {$and:[{section:sectionTeacher},{subject:subjectTeacher}]};
    var newvalues = {$set: {sampleAns: sampleAns}};

    Evaluation.updateMany(myquery, newvalues, function(err, resp){
      if (err) {
        return res.status(500).send({
          success: false,
          message: 'Error: Server Error.'
        });
      } else {
        return res.status(200).send({
          success: true,
          message: 'Password succesfully changed.'
        });
      }

    });



  });


  



};
