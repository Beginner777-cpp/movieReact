import React, { Component } from "react";
import * as MovieList from "../Data/fakeMovieService.js";
import * as GenreList from "../Data/fakeGenreService.js";
import Pagination from "./common/pagination";
import Like from "./common/Like";
import paginate from "../utils/paginate";
import List from "./common/list";
class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      currentPage: 1,
      pageSize: 4,
      selectedGenre: { _id: "", name: "All Genres" }
    };
  }
  componentDidMount() {
    this.setState({
      movies: MovieList.getMovies(),
      genres: [{ _id: "", name: "All Genres" }, ...GenreList.getGenres()],
    });
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
  handleGenre = (genre) => {
    this.setState({
      currentPage: 1,
      selectedGenre: genre,
    });
  };
  render() {
    const { currentPage, pageSize, selectedGenre, genres } = this.state;
    const allMovies =
      selectedGenre && selectedGenre._id
        ? this.state.movies.filter(
            (movie) => movie.genre._id === selectedGenre._id
          )
        : this.state.movies;
    const count = allMovies.length;
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <div className="movie container">
        <List
          handleGenre={this.handleGenre}
          selectedGenre={selectedGenre}
          genres={genres}
        />
        <div className="content">
          {this.state.movies.length !== 0 ? (
            <p>Showing {allMovies.length} movies in the database</p>
          ) : (
            <p>No movies in the database</p>
          )}
          {this.state.movies.length !== 0 ? (
            <table className="table">
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
        </div>
      </div>
    );
  }
}

export default Movie;
