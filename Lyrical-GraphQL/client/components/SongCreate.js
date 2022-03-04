import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongs";

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  onSubmit(event) {
    event.preventDefault();
    //if we want to redirect user after submit, then we need to first check that is the mutation done or not
    // to check mutation done or not, we can chain a promise to props.mutate
    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        refetchQueries: [
          {
            query: query,
          },
        ],
      })
      .then(() => {
        hashHistory.push("/");
      });
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title</label>
          <input
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
