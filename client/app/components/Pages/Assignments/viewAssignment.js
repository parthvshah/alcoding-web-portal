import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, ToastStore } from 'react-toasts';

export default class viewAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignment:[]
        };
    }
    componentDidMount(){
        var token = localStorage.getItem('token');
        const { match: { params } } = this.props;
        // /api/assignments/:assignmentID/details
        axios.get(`/api/assignments/${params.assignmentID}/details`)
        .then(res=> {
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
    }
    render() {
        let content;
        const Content = (
            <div>
                <div id="AssignmentCard">
                    <div className="card bg-light mx-auto">
                        <div className="card-title" style={{textAlign: "center"}}><h3><i>{this.state.assignment.uniqueID}</i>: {this.state.assignment.name}</h3></div>
                        <div className="card-body text-left">
                            Description: {this.state.assignment.details}<br />
                            {/* Type: {this.state.assignment.type}<br />
                            Due Date: {this.state.assignment.dueDate}<br />
                            Maximum Marks: {this.state.assignment.maxMarks}<br />
                            Resource URL: <a href={'//' + this.state.assignment.resourceUrl}>{this.state.assignment.resourceUrl}</a><br /><br /> */}
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

