import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`song/${id}`}>{title}</Link>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading... </div>;
    } else {
      return (
        <div>
          <ul className="collection">{this.renderSongs()}</ul>
          <Link to="/songs/new" className="btn-floating btn-large red right">
            <i className="material-icons">add</i>
          </Link>
        </div>
      );
    }
  }
}

const query = gql`
  query {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
