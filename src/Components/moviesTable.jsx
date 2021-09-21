import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { getUser } from "../services/authService";
class MovieTable extends Component {
  render() {
    const { movies, toggleLike, deleteMovie, setColumnSort, handleSort } =
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
    ];
    if (getUser() && getUser().isAdmin) {
      columns.push({
        key: "delete",
        content: (movie) => (
          <button
            className="btn btn-danger"
            onClick={() => deleteMovie(movie._id)}
          >
            Delete
          </button>
        ),
      });
    }
    return (
      <Table
        columns={columns}
        movies={movies}
        setColumnSort={setColumnSort}
        handleSort={handleSort}
      />
    );
  }
}

export default MovieTable;
