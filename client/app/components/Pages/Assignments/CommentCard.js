import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import viewSubmissions from './viewSubmissions';
import { format } from 'date-fns';

class CommentCard extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      loading: false
    })
  }

  componentDidMount() {
    
  }


  render() {
    let content;

    const Content = (
      <div>
        <p><strong>{this.props.username}</strong> at {format(this.props.createdOn, 'MMMM Do, YYYY H:mma')}: {this.props.text}</p>
      </div>
    );

    content = Content;

    return (
      <div>{content}</div>

    )
  }
}

export default CommentCard;
