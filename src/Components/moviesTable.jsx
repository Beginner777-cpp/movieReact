import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
class MovieTable extends Component {
  render() {
    const { movies, allMovies, toggleLike, deleteMovie, setColumnSort, handleSort } =
      this.props;
    const columns = [
      { path: "title", label: "Title" },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: (movie) => (
          <Like toggleLike={() => toggleLike(movie)} liked={movie.liked} />
        ),
      },
      {
        key: "delete",
        content: (movie) => (
          <button
            className="btn btn-danger"
            onClick={() => deleteMovie(movie._id)}
          >
            Delete
          </button>
        ),
      },
    ];
    return (
      <Table columns = {columns} movies={movies} allMovies={allMovies} setColumnSort={setColumnSort} handleSort={handleSort}/>
    );
  }
}

export default MovieTable;
