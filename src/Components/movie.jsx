import React, { Component } from "react";
import * as MovieList from "../Data/fakeMovieService.js";
import Pagination from "./common/pagination";
import Like from "./common/Like";
import paginate from "../utils/paginate";
class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movies: MovieList.getMovies(),
      currentPage: 1,
      pageSize: 4,
    };
  }
  deleteMovie = (id) => {
    MovieList.deleteMovie(id);
    this.setState({ movies: MovieList.getMovies() });
  };
  toggleLike = (movie) => {
    const movies = this.state.movies.map((el) => {
      if (el._id === movie._id) {
        el.liked = !el.liked;
      }
      return el;
    });
    this.setState({ movies });
  };

  handlePagination = (page) => {
    if (page === "+") {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    } else if (page === "-") {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    } else {
      this.setState({
        currentPage: page,
      });
    }
  };
  render() {
    const { currentPage, movies: allMovies, pageSize } = this.state;
    const count = allMovies.length;
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <React.Fragment>
        {this.state.movies.length !== 0 ? (
          <p>Showing {this.state.movies.length} movies in the database</p>
        ) : (
          <p>No movies in the database</p>
        )}
        {this.state.movies.length !== 0 ? (
          <table className="table container">
            <thead>
              <tr>
                <th>№</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <th>
                    {allMovies.findIndex((el) => el._id === movie._id) + 1}
                  </th>
                  <th>{movie.title}</th>
                  <th>{movie.genre.name}</th>
                  <th>{movie.numberInStock}</th>
                  <th>{movie.dailyRentalRate}</th>
                  <th>
                    <Like
                      toggleLike={() => this.toggleLike(movie)}
                      liked={movie.liked}
                    />
                  </th>
                  <th>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteMovie(movie._id)}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
        <Pagination
          pageSize={pageSize}
          totalItems={count}
          currentPage={currentPage}
          handlePagination={this.handlePagination}
        />
      </React.Fragment>
    );
  }
}

export default Movie;
