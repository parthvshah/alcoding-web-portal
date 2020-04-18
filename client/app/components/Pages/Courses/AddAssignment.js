import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import AssignmentCard from '../Assignments/AssignmentCard';
import { ToastContainer, ToastStore } from 'react-toasts';

class AssignmentAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            uniqueID: '',
            type: '',
            details: '',
            maxMarks: undefined,
            resourcesUrl: '',
            startDate: '',
            endDate: '',
            assignment: {},
            assignments: [],
            show: false.anchorDescription,
            showDescription: true
        };
        this.onAdd = this.onAdd.bind(this);
        this.showForm = this.showForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUniqueidChange = this.handleUniqueidChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleDetailsChange = this.handleDetailsChange.bind(this);
        this.handleMarksChange = this.handleMarksChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }
    componentDidMount() {
        var self = this;
        const { match: { params } } = this.props;
        console.log(this.props.anchorDescription);
        if(this.props.anchorDescription == ""){
            this.setState({
                showDescription:false
            });
        }
        var token = localStorage.getItem('token')
        ///api/assignments/:courseID/assignments
        axios.get(`/api/assignments/${params.courseID}/assignments`, {
            headers: {
                'x-access-token': token,
            }
        }).then(function (response) {
            if (!response.data.success) {
                console.log("Error1: " + response.data);
                ToastStore.error('Server error!');
            }
            var data = response.data;
            self.setState({
                assignments: self.state.assignments.concat(data.assignments.assignments)
            });
            console.log(response.data);
            ToastStore.success('Loaded!');
        })
            .catch(function (error) {
                console.log('Error2: ', error);
                ToastStore.error('Server error!');
            });
    }
    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }
    handleUniqueidChange(e) {
        this.setState({
            uniqueID: e.target.value
        })
    }
    handleTypeChange(e) {
        this.setState({
            type: e.target.value
        })
    }
    handleDetailsChange(e) {
        this.setState({
            details: e.target.value
        })
    }
    handleMarksChange(e) {
        this.setState({
            maxMarks: e.target.value
        })
    }
    handleURLChange(e) {
        this.setState({
            resourcesUrl: e.target.value
        })
    }
    handleStartDateChange(e) {
        this.setState({
            startDate: e.target.value
        })
    }
    handleEndDateChange(e) {
        this.setState({
            endDate: e.target.value
        })
    }
    reload() {
        window.location.reload()
    }
    onAdd() {
        var self = this;
        var userID = localStorage.getItem('user_id');
        var token = localStorage.getItem('token');
        const { match: { params } } = this.props;

        var config = {
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            }
        }
        var data = Object.assign({}, self.state.assignment);
        data.name = self.state.name;
        data.uniqueId = self.state.uniqueID;
        // data.type = self.state.type;
        data.courseID = params.courseID;
        // data.maxMarks = self.state.maxMarks;
        data.details = self.state.details;
        data.resourcesUrl = self.state.resourcesUrl;
        // var duration = { startDate: self.state.startDate, endDate: self.state.endDate }
        // data.duration = duration;
        data = JSON.stringify(data);
        console.log(data);
        axios.post(`/api/assignments/${userID}/createAssignment`, data, config)
            .then(res => {
                console.log(res.data);
                this.reload();
                ToastStore.success('Successfully updated!');
            })
            .catch(err => {
                console.log(err);
                ToastStore.error('Server error!');

            })
    }
    showForm() {
        this.setState({
            show: true
        })
    }
    closeForm() {
        this.setState({
            show: false
        })
    }
    render() {
        let content;
        const click = (
            <div>
                <form>
                    <div className="form-group text-left">
                        <h6>Post Title<sup>*</sup></h6>
                        <input type="text" className="form-control " placeholder="Name" value={this.state.name} onChange={this.handleNameChange}/>
                    </div>
                    <div className="form-group text-left">
                        <h6>Unique ID<sup>*</sup></h6>
                        <input type="text" className="form-control" placeholder="Unique ID" value={this.state.uniqueID} onChange={this.handleUniqueidChange}/>
                    </div>
                    {/* <div className="form-group text-left">
                        <h6>Type<sup>*</sup></h6>
                        <input type="text" className="form-control" placeholder="Type" value={this.state.type} onChange={this.handleTypeChange}/>
                    </div> */}
                    <div className="form-group text-left">
                        <h6>Post Description<sup>*</sup></h6>
                        <textarea className="form-control" placeholder="Details" value={this.state.details} onChange={this.handleDetailsChange} />
                    </div>
                    {/* <div className="form-group text-left">
                        <h6>Maximum Marks<sup>*</sup></h6>
                        <input type="number" className="form-control" placeholder="Maximum Marks" value={this.state.maxMarks} onChange={this.handleMarksChange}/>
                    </div> */}
                    {/* <div className="form-group text-left">
                        <h6>Duration</h6>
                        <label>Start Date<sup>*</sup></label>
                        <input type="date" className="form-control" placeholder="Start Date" value={this.state.startDate} onChange={this.handleStartDateChange}/>
                        <label>End Date<sup>*</sup></label>
                        <input type="date" className="form-control" placeholder="End Date" value={this.state.endDate} onChange={this.handleEndDateChange}/>
                    </div> */}
                    <div className="form-group text-left">
                        <h6>Resources</h6>
                        <input type='text' className="form-control" placeholder="URLs" value={this.state.resourcesUrl} onChange={this.handleURLChange} />
                    </div>
                </form>
            </div>
        )
        const AssignmentContent = (
            <div>
                {
                    this.state.assignments.map(function (each) {
                        return <AssignmentCard key={each.uniqueID} uniqueID={each.uniqueID} name={each.name} details={each.details} createdOn={each.createdOn} upVotes={each.upvotes} downVotes={each.downvotes} views={each.views} type={each.type} maxMarks={each.maxMarks} resourceUrl={each.resourceUrl} assignmentID={each._id} submissions={each.submissions} role='prof' />
                    })
                }
            </div>
        );
        content = AssignmentContent;
        return (
            <div>
                <div className='row'>
                    <div className='col'>

                        <div className="display-4 text-center">{this.props.location.state.code}: {this.props.location.state.name}</div><br/>
                        {this.props.location.state.anchorDescription ? <div className="font-italic">Description: {this.props.location.state.anchorDescription}</div> : null}

                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='text-center'>
                            Posts for this topic
                        </h1>
                        <hr />
                        {content}
                    </div>
                    <div className='col-sm-5'>
                        <div className='card text-center bg-light'>
                            <div className='card-body '>
                                {this.state.show ? click : <button type="button" className="btn btn-dark w-20 mx-3" onClick={this.showForm}>Add Post</button>}
                                {this.state.show ? null : <button className="btn w-20 mx-3"><Link className='text-dark' to="/topics"> Back To Topics </Link></button>}
                                {this.state.show ? <button type="submit" className="btn btn-dark mx-3 w-20 " onClick={this.onAdd}>Submit</button> : null}
                                {this.state.show ? <button type="close" className="btn w-20 mx-3" onClick={this.closeForm}>Close</button> : null}
                            </div>
                        </div>
                    </div>

                </div>
                <ToastContainer store={ToastStore} position={ToastContainer.POSITION.BOTTOM_RIGHT} />
            </div>
        );
    }
}
export default AssignmentAdd;