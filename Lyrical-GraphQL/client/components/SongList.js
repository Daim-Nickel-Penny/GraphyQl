import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

function SongList(props) {
  function renderSongs() {
    return props.data.songs.map((song, key) => {
      return (
        <li key={song.id} className="collection-item">
          {song.title}
        </li>
      );
    });
  }
  //if loading then display loading else call rendersongs
  if (props.data.loading) {
    return <div>Loading</div>;
  } else {
    return <ul className="collection">{renderSongs()}</ul>;
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
