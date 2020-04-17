import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, ToastStore } from 'react-toasts';
import CommentCard from './CommentCard';
import { _API_CALL } from './../../../Utils/api';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'


export default class viewAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignment:[],
            assignmentID: '',
            name: '',
            usn: '',
            newComment: ''
        };
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.addComment = this.addComment.bind(this);
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
    }
    componentDidMount(){
        var self = this;
        var token = localStorage.getItem('token');
        const { match: { params } } = this.props;
        // /api/assignments/:assignmentID/details
        self.setState({ assignmentID: params.assignmentID });
        axios.get(`/api/assignments/${params.assignmentID}/details`)
        .then(res => {
            console.log(res);
            ToastStore.success('Loaded!');
            this.setState({
                assignment: res.data.data.assignment
            })
        
        })
        .catch((err) => {
            console.log(err);
            ToastStore.error('Server error!');
        });
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
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    reload() {
        window.location.reload();
    }

    handleCommentChange(e) {
        this.setState({
            newComment: e.target.value
        })
    }

    upVote(event){
        event.preventDefault();
        var self = this;
        var userID = localStorage.getItem('user_id');
        var token = 'Bearer ' + localStorage.getItem('token');
        var assignmentID = this.props.assignmentID;
        var inputData = new FormData();
        inputData.append("inputFile", this.state.file);
        var config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
        }

        var apiPath = 'api/assignments/' + userID + '/' + assignmentID + '/upload'
        axios.post(apiPath, inputData, config)
        .then(res => {
            console.log(res.data)
            if (res.data.success) {
            self.setState({
                showUpload: false
            })
            ToastStore.success('Successfully added!');
            }
            else {
            ToastStore.error('Server error');
            }
        })

    }

    downVote(event){
        event.preventDefault();
        var self = this;
        var userID = localStorage.getItem('user_id');
        var token = 'Bearer ' + localStorage.getItem('token');
        
        var assignmentID = this.props.assignmentID;
        var inputData = new FormData();
        inputData.append("inputFile", this.state.file);
        var config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
        }

        var apiPath = 'api/assignments/' + userID + '/' + assignmentID + '/upload'
        axios.post(apiPath, inputData, config)
        .then(res => {
            console.log(res.data)
            if (res.data.success) {
            self.setState({
                showUpload: false
            })
            ToastStore.success('Successfully added!');
            }
            else {
            ToastStore.error('Server error');
            }
        })

    }

    addComment() {
        var self = this;
        var userID = localStorage.getItem('user_id');
        var token = 'Bearer ' + localStorage.getItem('token');
        var config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          }
        var apiPath = '/api/assignments/addComment';
        var data = {
            assignmentID: this.state.assignmentID,
            text: this.state.newComment,
            username: this.state.name
        };
        console.log(data);
        axios.post(apiPath, data, config)
          .then(res => {
            console.log(res.data)
            if (res.data.success) {
              self.setState({
                showUpload: false
              });
              this.reload();
              ToastStore.success('Successfully added!');
            }
            else {
              ToastStore.error('Server error');
            }
          })
    }

    render() {
        let content;
        let comments;

        if(this.state.assignment.comments){
            comments = (
                <div>
                    {
                        this.state.assignment.comments.map(function (each) {
                            return <CommentCard text={each.text} username={each.username} createdOn={each.createdOn} />
                        })
                    }
                </div>
            );
        }
        else{
            comments = (<div></div>);
        }

        const Content = (
            <div>
                <div id="AssignmentCard">
                    <div className="card bg-light mx-auto">
                        <div className="card-title" style={{textAlign: "center"}}><h3><i>{this.state.assignment.uniqueID}</i>: {this.state.assignment.name}</h3></div>
                        <div className="card-body text-left">
                            <br />
                            <div className="btn-group" style={{alignSelf: "center"}}>
                                <button type="button" className="btn btn-success" onClick={this.upVote}>
                                    <FontAwesomeIcon icon={faArrowAltCircleUp} /> +{this.state.assignment.upvotes}
                                </button>
                                
                                <button type="button" className="btn btn-danger" onClick={this.downVote}>
                                    <FontAwesomeIcon icon={faArrowAltCircleDown} /> -{this.state.assignment.downvotes}
                                </button>
                            
                            </div>
                            <br />
                            <br />

                            <p>Description: {this.state.assignment.details}</p>
                            
                            <br />
                            <br />
                            {format(this.state.assignment.createdOn, 'MMMM Do, YYYY H:mma')}
                            <br />
                            {comments}
                            {/* Type: {this.state.assignment.type}<br />
                            Due Date: {this.state.assignment.dueDate}<br />
                            Maximum Marks: {this.state.assignment.maxMarks}<br />
                            Resource URL: <a href={'//' + this.state.assignment.resourceUrl}>{this.state.assignment.resourceUrl}</a><br /><br /> */}
                            <br />
                            <div>
                                <form>
                                    <div className="form-group text-left">
                                        <input type="text" className="form-control" placeholder="Comment" onChange={this.handleCommentChange}/>
                                    </div>
                                    <button type="button" className="btn btn-dark w-20 mx-3" onClick={this.addComment}>Add Comment</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
                <div className="text-center"><a href="/" className="btn btn-dark" role="button">Home</a></div>
                <ToastContainer store={ToastStore} position={ToastContainer.POSITION.BOTTOM_RIGHT} />
            </div>
        );


        content = Content;

        return (
            <div>{content}</div>

        )
    }
}

