import React from "react";
import MovieForm from "../movieForm";
const MovieId = (props) => {
  return (
    <div>
      <MovieForm id={props.match.params.id} {...props} />
    </div>
  );
};

export default MovieId;
