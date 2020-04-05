import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactLoading from '../../common/Loading';
import { ToastContainer, ToastStore } from 'react-toasts';
import { _API_CALL } from './../../../Utils/api';

class Evaluation extends Component {
  constructor() {
    super();
    this.state = {
      globalRankList: [],
      isLoading: true,
      name:"", 
      usn:"",
      section:"",
      subject:"", 
      assignment:"",
      subjectTeacher:"",
      sectionTeacher:"",
      searchUSN:"",
      sampleAns:""
    };
    // this.updateSection = this.updateSection.bind(this);
    // this.updateSubject = this.updateSubject.bind(this);
    // this.updateAssignment = this.updateAssignment.bind(this);
  }

  
  componentDidMount() {
    var self = this;
    var token = localStorage.getItem('token')
    var userID = localStorage.getItem('user_id')

    var apiPath = '/api/account/' + userID + '/details';
    _API_CALL(apiPath, "GET", {}, token)
        .then(response => {
            var data = response.data;
            self.setState({ isLoading: false });
            self.setState({
                usn: data.user.usn,
                name: data.user.name.firstName + " " + data.user.name.lastName,
                basicInfo: data.user.basicInfo
            });
        })
        .catch(error => {
            console.log(error);
        })
}

handleSectionChange(event) {
  this.setState({section: event.target.value});
}

handleSubjectChange(event) {
  this.setState({subject: event.target.value});
}

handleAssignmentChange(event) {
  this.setState({assignment: event.target.value});
}

handleUSNChange(event) {
  this.setState({usn: event.target.value});
}

handleSubmit(event){
  console.log("usn:" + this.state.usn);
  console.log("section:" + this.state.section);
  console.log("subject:" + this.state.subject);
  console.log("assignment:" + this.state.assignment);
  var token = localStorage.getItem('token');
  var userID = localStorage.getItem('user_id');
  
  event.preventDefault();

  const body = {
    usn: this.state.usn,
    section: this.state.section,
    subject:this.state.subject,
    assignment:this.state.assignment
  };
  //' + userID + '
  var apiPath = '/api/evaluation';
  axios.post(
    apiPath,
    body,
    {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.data.success) {
          console.log(response);
          ToastStore.success('Successfully updated!');
        }
    }).catch(function (error) {
        // TODO: Try again after sometime? 
        console.log('Caught here: ', error);
    });
  

}

handleSampleAnsChange(event){
  this.setState({sampleAns: event.target.value});
  // alert("hey there");
}

handleSearchUSNChange(event){
  this.setState({searchUSN: event.target.value});
}

handleSectionTeacherChange(event){
  this.setState({sectionTeacher: event.target.value});
}

handleSubjectTeacherChange(event){
  this.setState({subjectTeacher: event.target.value});
}







handleSubmitTeacher(event){
  var token = localStorage.getItem('token');
  var userID = localStorage.getItem('user_id');
  console.log(this.state.searchUSN);
  console.log(this.state.sectionTeacher);
  console.log(this.state.subjectTeacher);
  console.log(this.state.sampleAns);
  event.preventDefault();
  const body = {
    searchUSN: this.state.searchUSN,
    sectionTeacher: this.state.sectionTeacher,
    subjectTeacher:this.state.subjectTeacher,
    sampleAns:this.state.sampleAns
  };
  var apiPath = '/api/evaluation/teacher';
  axios.post(
    apiPath,
    body,
    {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.data.success) {
          console.log(response);
          ToastStore.success('Successfully updated!');
        }
    }).catch(function (error) {
        // TODO: Try again after sometime? 
        console.log('Caught here: ', error);
    });


}

  render() {
    return (
      <div className="App">
        <div className="page-header">
    <h1>Hey {this.state.name}</h1>      
    </div>
    <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="md-form">
  <input type="text" id="inputMDEx" className="form-control" value={this.state.usn} onChange={this.handleUSNChange.bind(this)}/>
  <label>Enter your USN</label>
</div>
    <div className="form-group">
      <label>Section</label>
      <select className="form-control" id="sel1" name="section" value={this.state.section} onChange={this.handleSectionChange.bind(this)}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
      </div>
{/* </form> */}
<br/>

<div className="form-group">
      <label>Subject</label>
      <select className="form-control" id="sel1" name="subject" value={this.state.subject} onChange={this.handleSubjectChange.bind(this)}>
        <option value="CC">CC</option>
        <option value="WT-2">WT-2</option>
        <option value="CD">CD</option>
        <option value="TDL">TDL</option>
      </select>
      </div>

       <div className="form-group purple-border">
  <label> Submit your assignment here</label>
  <textarea className="form-control" id="exampleFormControlTextarea4" rows="3" name="assignment" value={this.state.assignment} onChange={this.handleAssignmentChange.bind(this)}></textarea>
</div>
 <input type="submit" className="btn btn-info" value="Submit"/>
{/* <Button variant="success" onClick = {this.handleSubmit.bind(this)}>Success</Button>{' '} */}
</form>











{/* Teacher part starts here */}









<div className="page-header">
    <h1>Hey {this.state.name}</h1>      
    </div>
    <form onSubmit={this.handleSubmitTeacher.bind(this)}>
    <div className="form-group">
      <label>Section</label>
      <select className="form-control" id="sel1" name="sectionTeacher" value={this.state.sectionTeacher} onChange={this.handleSectionTeacherChange.bind(this)}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
      </div>
{/* </form> */}
<br/>

<div className="form-group">
      <label>Subject</label>
      <select className="form-control" id="sel1" name="subjectTeacher" value={this.state.subjectTeacher} onChange={this.handleSubjectTeacherChange.bind(this)}>
        <option value="CC">CC</option>
        <option value="WT-2">WT-2</option>
        <option value="CD">CD</option>
        <option value="TDL">TDL</option>
      </select>
      </div>
      

      <div class="form-group purple-border">
  <label for="exampleFormControlTextarea4">Sample Answer</label>
  <textarea class="form-control" id="exampleFormControlTextarea4" rows="3" name="sampleAns" value={this.state.sampleAns} onInput={this.handleSampleAnsChange.bind(this)}></textarea>
</div>
<div className="md-form active-pink active-pink-2 mb-3 mt-0">
  <input className="form-control" type="text" placeholder="Search for a USN" aria-label="Search" name="searchUSN" value={this.state.searchUSN} onChange={this.handleSearchUSNChange.bind(this)}/>
  </div>
 <input type="submit" className="btn btn-info" value="Submit"/>
{/* <Button variant="success" onClick = {this.handleSubmit.bind(this)}>Success</Button>{' '} */}
</form>


<ToastContainer store={ToastStore} position={ToastContainer.POSITION.BOTTOM_RIGHT} />


      </div>
    );
  }
}

export default Evaluation;
