import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSong from "../queries/fetchSong";
import LyricsCreate from "./LyricsCreate";

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;
    console.log(song);
    if (!song) {
      return <div>Loading....</div>;
    }
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricsCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);