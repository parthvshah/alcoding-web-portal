import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import viewSubmissions from './viewSubmissions';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp, faArrowAltCircleDown, faArchive,  faGraduationCap, faUserTie} from '@fortawesome/free-solid-svg-icons'

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
    let badgeTag;

    if(this.props.badge=="professor"){
        
      badgeTag = (
          <FontAwesomeIcon icon={faUserTie} />
      );
  
    }
    else{
        badgeTag = (
            <FontAwesomeIcon icon={faGraduationCap} />
        );
  
  }

    const Content = (
      <div>
        <p>{badgeTag}<strong> {this.props.username}</strong> at {format(this.props.createdOn, 'MMMM Do, YYYY H:mma')}: {this.props.text}</p>
      </div>
    );

    content = Content;

    return (
      <div>{content}</div>

    )
  }
}

export default CommentCard;
