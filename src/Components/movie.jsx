import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as MovieList from "../Data/fakeMovieService.js";
import * as GenreList from "../Data/fakeGenreService.js";
import MovieTable from "./moviesTable.jsx";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import List from "./common/list";
import SearchBox from "./searchBox";
import _ from "lodash";
class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      currentPage: 1,
      pageSize: 4,
      selectedGenre: { _id: "", name: "All Genres" },
      setColumnSort: { name: "", type: "asc" },
      movieSearch: [],
      querySearch: "",
    };
  }
  componentDidMount() {
    this.setState({
      movies: MovieList.getMovies(),
      movieSearch: MovieList.getMovies(),
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
      movieSearch: this.state.movies,
      currentPage: 1,
      selectedGenre: genre,
      querySearch: '',
    });
  };
  handleSort = (setColumnSort) => {
    this.setState({
      setColumnSort: setColumnSort,
    });
  };
  getPagedData = (allMovies, setColumnSort, currentPage, pageSize) => {
    const count = allMovies.length;
    const sortedMovies = _.orderBy(
      allMovies,
      [setColumnSort.name],
      [setColumnSort.type]
    );
    const filteredMovie = paginate(sortedMovies, currentPage, pageSize);
    return { count, filteredMovie };
  };

  handleSearch = (query) => {
    this.setState({
      selectedGenre: { _id: "", name: "All Genres" },
      currentPage: 1,
      querySearch: query,
    });
    let { movies } = this.state;
    let movieSearch = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].title.toLowerCase().includes(query.toLowerCase())) {
        movieSearch.push(movies[i]);
      }
    }
    this.setState({ movieSearch });
    return movieSearch;
  };
  render() {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      genres,
      setColumnSort,
      movieSearch,
    } = this.state;
    const allMovies =
      selectedGenre && selectedGenre._id
        ? this.state.movies.filter(
            (movie) => movie.genre._id === selectedGenre._id
          )
        : this.state.movies;
    const { count, filteredMovie } = this.getPagedData(
      selectedGenre._id ? allMovies : movieSearch,
      setColumnSort,
      currentPage,
      pageSize
    );
    return (
      <React.Fragment>
        <div className="movie container">
          <List
            handleGenre={this.handleGenre}
            selectedGenre={selectedGenre}
            genres={genres}
          />
          <div className="content">
            <Link to="movies/new" className="btn btn-primary">
              New Movie
            </Link>

            {movieSearch.length !== 0 ? (
              <p>Showing {movieSearch.length} movies in the database</p>
            ) : (
              <p>No movies in the database</p>
            )}
            <SearchBox
              query={this.state.querySearch}
              handleSearch={this.handleSearch}
            />
            {movieSearch.length !== 0 ? (
              <MovieTable
                movies={filteredMovie}
                toggleLike={this.toggleLike}
                deleteMovie={this.deleteMovie}
                handleSort={this.handleSort}
                setColumnSort={setColumnSort}
              />
            ) : null}
            <Pagination
              pageSize={pageSize}
              totalItems={count}
              currentPage={currentPage}
              handlePagination={this.handlePagination}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movie;
