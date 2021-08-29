import React from "react";

const MovieId = (props) => {
  const onSave = () => {
      console.log('save movie', props);
        props.history.replace('/movies');
  };
  return (
    <div>
      <h1>{props.match.params.id}</h1>
      <button onClick={onSave}>Save</button>
    </div>
  );
};

export default MovieId;
