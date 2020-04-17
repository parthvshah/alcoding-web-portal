import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      globalRankList: [],
      loading: true
    };
  }

  componentDidMount() {
    var self = this;
    var token = localStorage.getItem('token');
    var userID = localStorage.getItem('user_id');

    var apiPath = '/api/contests/globalRankList';
    axios.get(apiPath, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        if (!response.data.success) {
          console.log("Error: " + response.data);
          return;
        }
        var data = response.data.globalRankList.userContenderDetails;
        data.sort(function (a, b) {
          return b.rating - a.rating;
        });
        self.setState({
          globalRankList: data,
          loading: false
        });

      })
      .catch(function (error) {
        self.setState({
          loading: false
        })
        console.log('Error: ', error);
      });
  }

  render() {

    const data = this.state.globalRankList;

    const columns =
      [
        {
          Header: "Rank",
          id: "row",
          maxWidth: 65,
          filterable: false,
          Cell: (row) => {
            return <div>{row.index + 1}</div>;
          }
        },
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "USN",
          accessor: "usn",
          maxWidth: 200,
        },
        {
          Header: "Contests",
          accessor: "timesPlayed",
          maxWidth: 100,
        },
        {
          Header: "Rating",
          accessor: "rating",
          maxWidth: 150,
        },
        {
          Header: "Best",
          accessor: "best",
          maxWidth: 150,
        }
      ]

    const staticText = {
      aboutUs: "",
      latestNews: "",
      announcements: ""
    }

    return (
      <div>
          <div className="masthead-followup row m-0 bg-light mb-4" style={{ "borderRadius": 5 }}>
            <div className="col-12 col-md-4 p-3 p-md-8 border-right">
              <h3 className="text-center">About Us</h3>
              <p></p><p className="text-justify">{staticText.aboutUs}</p>
            </div>
            <div className="col-12 col-md-4 p-3 p-md-8 border-right">
            <h3 className="text-center">Latest News</h3>
              <p></p><p className="text-justify">{staticText.latestNews}</p>
            </div>
            <div className="col-12 col-md-4 p-3 p-md-">
            <h3 className="text-center">Announcements</h3>
              <p></p><p className="text-justify">{staticText.announcements}</p>
          </div>
        </div>
        {/* <div className="jumbotron pt-3 pb-2 bg-light">
          <div className='display-4 mb-3'>Global Rank List</div>
          <br />
          <ReactTable
            loading={this.state.loading}
            data={data}
            columns={columns}
            defaultSorted={[
              {
                id: "rating",
                desc: true
              }
            ]}
            defaultPageSize={10}
            index=""
            viewIndex=""
            className="-striped -highlight"
          />
          <br />
        </div> */}
      </div>
    );
  }
}

export default Home;
