import React from "react";
import New from "../new";
const MovieId = (props) => {
  return (
    <div>
      <New id={props.match.params.id} {...props}/>
    </div>
  );
};

export default MovieId;
