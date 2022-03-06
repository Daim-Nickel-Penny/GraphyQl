import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
class LyricsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId,
        },
      })
      .then(() => {
        this.setState({ content: "" });
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={(e) =>
            this.setState({
              content: e.target.value,
            })
          }
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        likes
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricsCreate);
