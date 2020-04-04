const User = require('../../models/User');
const Evaluation = require('../../models/Evaluation');
var requireRole = require('../../middleware/Token').requireRole;
var verifyUser = require('../../middleware/Token').verifyUser;

module.exports = (app) => {
  app.post('/api/evaluation', (req, res) => {
    var usn = req.body.usn;
    var section = req.body.section;

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
    const newEval = new Evaluation();
    newEval.usn = usn;
    newEval.section = section;
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
}
