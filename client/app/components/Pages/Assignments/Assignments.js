import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import AssignmentCard from './AssignmentCard';
import ReactLoading from './../../common/Loading';
import { ToastContainer, ToastStore } from 'react-toasts';

class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      courses: [],
      role: "student",
      assignments: [],
      lessAssignments: [],
      searchKey: '',
      order: '',
      reverse: '',
      searchAssignments: [],
    };
    this.search = this.search.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleReverseChange = this.handleReverseChange.bind(this);
    this.renderMore = this.renderMore.bind(this);
  }
  componentDidMount() {
    var self = this;
    var token = localStorage.getItem('token');
    var userID = localStorage.getItem('user_id');

    var apiPath = '/api/account/' + userID + '/details'
    axios.get(apiPath, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        if (!response.data.success) {
          // TODO: throw appropriate error and redirect
          console.log("Error1: " + response.data);
          ToastStore.error('Server error!');
          return;
        }
        var data = response.data;
        self.setState({
          role: data.user.role
        });
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          if (error.response.status) {
            alert("Session timed out.");
            window.location.href = '/';
          }
        }
      });
    var apiPath = '/api/assignments/' + userID + '/courses'
    axios.get(apiPath, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        if (!response.data.success) {
          // TODO: throw appropriate error and redirect
          console.log("Error1: " + response.data);
          ToastStore.error('Server error!');
          <Redirect to="/" />
        }
        var data = response.data;
        // console.log(data);
        self.setState({ isLoading: false });
        self.setState({
          courses: data.courses
        });
        var courses = data.courses;
        for (var i = 0; i < courses.length; i++) {
          var apiPath = '/api/assignments/' + courses[i]._id + '/' + userID + '/new';
          axios.get(apiPath, {
            headers: {
              'x-access-token': token,
              'Content-Type': 'application/json'
            }
          })
            .then(function (response) {
              if (!response.data.success) {
                console.log("Error1: " + response.data);
                ToastStore.error('Server error!');
              }
              var data = response.data;
              self.setState({
                assignments: self.state.assignments.concat(data.assignments.assignments),
                reverse: "T"
              });
              var allAssignments = self.state.assignments;
              self.setState({
                lessAssignments: allAssignments.slice(0, 4)
              });
              console.log(response.data);
              // ToastStore.success('Successfully updated!');
            })
            .catch(function (error) {
              console.log('Error2: ', error);
              ToastStore.error('Server error!');

            });
        }// End of for loop
      })
  }

  handleSearchChange(event){
    this.setState({
      searchKey: event.target.value
  })
  }

  renderMore(){
    var self = this;
    var allAssignments = self.state.assignments;
    self.setState({
      lessAssignments: allAssignments
    });
  }
  
  handleReverseChange(event) {
    var val = event.target.querySelector("input").value;
    // console.log(val);
    if(val=="T" || val=="F"){
      this.setState({
        reverse: val
        });
    }
    else{
      this.setState({
          order: val
      });
    }
  }


  search(){
    event.preventDefault();
    var self = this;
    var userID = localStorage.getItem('user_id');
    var token = 'Bearer ' + localStorage.getItem('token');
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }
    var data = {
      keyword: this.state.searchKey,
      order: this.state.order,
      reverse: this.state.reverse

    };
    console.log(data);
    var apiPath = '/api/posts/search';
    axios.post(apiPath, data, config)
      .then(res => {
        console.log(res.data.assignments);
        if (res.data.success) {
          self.setState({
            searchAssignments: res.data.assignments
          })
          ToastStore.success('Loaded!');
        }
        else {
          ToastStore.error('Server error!');
        }
      })

  }

  render() {
    let content;
    const searchContent = (
      <div>
        {
          this.state.searchAssignments.length < 1 &&
          <div className="lead text-center mb-2">Sorry, no results from search. Search using a keyword to explore. If you wish to simply order all posts, search without a keyword.</div>
        }
        
        {
          this.state.searchAssignments.map(function (each) {
            return <AssignmentCard key={each.uniqueID} uniqueID={each.uniqueID} name={each.name} details={each.details} createdOn={each.createdOn} upVotes={each.upvotes} downVotes={each.downvotes} views={each.views} type={each.type} maxMarks={each.maxMarks} resourceUrl={each.resourceUrl} assignmentID={each._id} submissions={each.submissions} role='prof' />
          })
        }
      </div>
    );

    const profContent = (
      <div>
          <div>
            <div className="card bg-light mx-auto">
            <div className="card-body text-left">
            <input type="text" className="form-control" placeholder="Search" onChange={this.handleSearchChange}/>
            <br />

            <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-secondary btn-dark" onClick={this.handleReverseChange}>
            <input type="radio" 
                    id="type" 
                    value="chronological"
                    autoComplete="off"
                    /> Chronological
            </label>
            <label className="btn btn-secondary btn-dark" onClick={this.handleReverseChange}>
            <input type="radio"
                    id="type" 
                    value="upvotes"
                    autoComplete="off"
                    /> Up Votes
            </label>
            <label className="btn btn-secondary btn-dark" onClick={this.handleReverseChange}>
            <input type="radio"
                    id="type" 
                    value="downvotes"
                    autoComplete="off"
                    /> Down Votes
            </label>
            <label className="btn btn-secondary btn-dark" onClick={this.handleReverseChange}>
            <input type="radio"
                    id="type" 
                    value="views"
                    autoComplete="off"
                    /> Views
            </label>
            </div>

            <br />
            <br />

            <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-secondary btn-dark" onClick={this.handleReverseChange}>
            <input type="radio" 
                    id="rev" 
                    value="T"
                    autoComplete="off"
                    /> Normal
            </label>
            <label className="btn btn-secondary btn-dark" onClick={this.handleReverseChange}>
            <input type="radio"
                    id="rev" 
                    value="F"
                    autoComplete="off"
                    /> Reversed
            </label>
            </div>

            <div className="text-center"><button type="button" className="btn btn-dark w-20 mx-3" onClick={this.search}>Search</button></div>
          </div>
        </div>
        <br />
      </div>
      {searchContent}
        {
          this.state.assignments.length < 1 &&
          <div className="lead text-center mb-2">Sorry, no posts found.</div>
        }
        {
          this.state.lessAssignments.map(function (each) {
            return <AssignmentCard key={each.uniqueID} isSearch={true} uniqueID={each.uniqueID} name={each.name} details={each.details} createdOn={each.createdOn} upVotes={each.upvotes} downVotes={each.downvotes} views={each.views} type={each.type} maxMarks={each.maxMarks} resourceUrl={each.resourceUrl} assignmentID={each._id} submissions={each.submissions} role='prof' />
          })
        }
        <button className="btn btn-link" onClick={this.renderMore}>See more</button>

        <div className="text-center"><a href="/" className="btn btn-dark" role="button">Home</a></div>
        <br />
        <br />

        <ToastContainer store={ToastStore} position={ToastContainer.POSITION.BOTTOM_RIGHT} />
      </div>
    );
    const studContent = (
      <div>
        {
          this.state.assignments.length < 1 &&
          <div className="lead text-center mb-2" style={{ color: "white" }}>Sorry, no posts found.</div>
        }
        {
          this.state.assignments.map(function (each) {
            return <AssignmentCard key={each.uniqueID} uniqueID={each.uniqueID} name={each.name} details={each.details} type={each.type} maxMarks={each.maxMarks} resourceUrl={each.resourceUrl} assignmentID={each._id} submissions={each.submissions} role='student' />
          })
        }
        

        <div className="text-center"><a href="/" className="btn btn-dark" role="button">Home</a></div>
      </div>
    );
    if (this.state.role == "prof") {
      content = profContent;
    }
    else {
      content = studContent;
    }
    if (this.state.isLoading)
      return <ReactLoading/>;
    else
      return (
      <div>{content}</div>
      );
  }
}
export default Assignments;