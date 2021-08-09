import React from "react";
import Like from "./common/Like";

const MovieTable = (props) => {
  const { movies, allMovies, toggleLike, deleteMovie, handleSort } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>№</th>
          <th onClick={() => handleSort("title")}>Title</th>
          <th onClick={() => handleSort("genre.name")}>Genre</th>
          <th onClick={() => handleSort("numberInStock")}>Stock</th>
          <th onClick={() => handleSort("dailyRentalRate")}>Rate</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <th>{allMovies.findIndex((el) => el._id === movie._id) + 1}</th>
            <th>{movie.title}</th>
            <th>{movie.genre.name}</th>
            <th>{movie.numberInStock}</th>
            <th>{movie.dailyRentalRate}</th>
            <th>
              <Like toggleLike={() => toggleLike(movie)} liked={movie.liked} />
            </th>
            <th>
              <button
                className="btn btn-danger"
                onClick={() => deleteMovie(movie._id)}
              >
                Delete
              </button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
