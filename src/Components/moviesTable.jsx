import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
class MovieTable extends Component {
  render() {
    const { movies, allMovies, toggleLike, deleteMovie, setColumnSort } =
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
      <table className="table">
        <TableHeader
          handleSort={this.props.handleSort}
          setColumnSort={setColumnSort}
          columns={columns}
        />
        <TableBody columns={columns} movies ={movies} allMovies={allMovies}/>
        {/* <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <th>{allMovies.findIndex((el) => el._id === movie._id) + 1}</th>
              <th>{movie.title}</th>
              <th>{movie.genre.name}</th>
              <th>{movie.numberInStock}</th>
              <th>{movie.dailyRentalRate}</th>
              <th>
                <Like
                  toggleLike={() => toggleLike(movie)}
                  liked={movie.liked}
                />
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
        </tbody> */}
      </table>
    );
  }
}

export default MovieTable;
