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
      assignment:""
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
  console.log("hello");
  // alert("heyyyy");
  // alert("usn:" + this.state.usn);
  console.log("usn:" + this.state.usn);
  console.log("section:" + this.state.section);
  console.log("subject:" + this.state.subject);
  console.log("assignment:" + this.state.assignment);
  var token = localStorage.getItem('token')
  var userID = localStorage.getItem('user_id')
  // var apiPath = '/api/evaluationStud/' + userID + '/details'
  
  event.preventDefault();
  const body = {
    usn: this.state.usn,
    name: this.state.name,
    section: this.state.section
  };
  //' + userID + '
  var apiPath = '/api/evaluation';
  axios.post(
    apiPath,
    body)
    // body,
    // {
    //     headers: {
    //         'x-access-token': token,
    //         'Content-Type': 'application/json'
    //     }
    // })
    .then(function (response) {
        if (!response.data.success) {
            // TODO: throw appropriate error and redirect
            console.log("Error: " + response.data);
            return;
        }
        else {
            // TODO: redirect to this page(profile)
            console.log(response.data);
            ToastStore.success('Successfully updated!');
        }
    })
    .catch(function (error) {
        // TODO: Try again after sometime? 
        console.log('error is ', error);
    });
  

}

  render() {
    // return <h2>I am a Car!</h2>;
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
{/* <Dropdown> 
  <Dropdown.Toggle variant="info" id="dropdown-basic">
    Section
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item active={this.state.value === "Action"} onClick={this.handleSectionChange.bind(this)}>Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown> */}
{/* <form> */}
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
      <select className="form-control" id="sel1" name="subjeect" value={this.state.subject} onChange={this.handleSubjectChange.bind(this)}>
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

      </div>
    );

    // const data = this.state.globalRankList;

    // const columns =
    //   [
    //     {
    //       Header: "Rank",
    //       id: "row",
    //       maxWidth: 65,
    //       filterable: false,
    //       Cell: (row) => {
    //         return <div>{row.index + 1}</div>;
    //       }
    //     },
    //     {
    //       Header: "Name",
    //       accessor: "name"
    //     },
    //     {
    //       Header: "USN",
    //       accessor: "usn",
    //       maxWidth: 200,
    //     },
    //     {
    //       Header: "Contests",
    //       accessor: "timesPlayed",
    //       maxWidth: 100,
    //     },
    //     {
    //       Header: "Rating",
    //       accessor: "rating",
    //       maxWidth: 150,
    //     },
    //     {
    //       Header: "Best",
    //       accessor: "best",
    //       maxWidth: 150,
    //     }
    //   ]

    // const staticText = {
    //   aboutUs: "Mithali is cute.",
    //   latestNews: "1 October 2018: Release of the Alcoding Club Platform which will enable students of the department to view Global Rankings, upcoming contests and any messages.",
    //   announcements: "The ACM International Collegiate Programming Contest (ACM ICPC) is the largest collegiate programming contest being organized all over the world every year. The ACM ICPC is an activity of the ACM that provides college students with an opportunity to demonstrate and sharpen their problem-solving and computing skills. The contest is considered as the \"Olympiad of Computer Programming\".  For more information about ACM ICPC, visit https://icpc.baylor.edu"
    // }

    // return (
    //   <div>
    //       <div className="masthead-followup row m-0 bg-light mb-4" style={{ "borderRadius": 5 }}>
    //         <div className="col-12 col-md-4 p-3 p-md-8 border-right">
    //           <h3 className="text-center">About Us</h3>
    //           <p></p><p className="text-justify">{staticText.aboutUs}</p>
    //         </div>
    //         <div className="col-12 col-md-4 p-3 p-md-8 border-right">
    //         <h3 className="text-center">Latest News</h3>
    //           <p></p><p className="text-justify">{staticText.latestNews}</p>
    //         </div>
    //         <div className="col-12 col-md-4 p-3 p-md-">
    //         <h3 className="text-center">Announcements</h3>
    //           <p></p><p className="text-justify">{staticText.announcements}</p>
    //       </div>
    //     </div>
    //     <div className="jumbotron pt-3 pb-2 bg-light">
    //       <div className='display-4 mb-3'>Global Rank List</div>
    //       <br />
    //       <ReactTable
    //         loading={this.state.loading}
    //         data={data}
    //         columns={columns}
    //         defaultSorted={[
    //           {
    //             id: "rating",
    //             desc: true
    //           }
    //         ]}
    //         defaultPageSize={10}
    //         index=""
    //         viewIndex=""
    //         className="-striped -highlight"
    //       />
    //       <br />
    //     </div>
    //   </div>
    // );
  }
}

export default Evaluation;
