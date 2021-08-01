import React, { Component, Fragment } from "react";
import * as MovieList from "../Data/fakeMovieService.js";
import Like from "./Like";
class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movies: MovieList.getMovies(),
    };
  }
  deleteMovie = (id) => {
    MovieList.deleteMovie(id);
    this.setState({ movies: MovieList.getMovies() });
  };
  toggleLike = (movie) => {
    console.log(movie);
    const movies = this.state.movies.map((el) => {
      if (el._id === movie._id) {
        el.liked = !el.liked;
      }
      return el;
    });

    this.setState({ movies });
  };

  render() {
    const listStyle = {
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    };
    const listItemStyle = {
      borderTop: "2px solid gray",
      borderBottom: "2px solid gray",
      display: "flex",
      justifyContent: "space-between",
      flex: 1,
      padding: "20px",
    };
    const flex1 = {
      flex: 1,
    };
    return (
      // <div className="container mt-3">
      //   <p className="">
      //     Showing {this.state.movies.length} movies in the database
      //   </p>
      //   <ul className="" style={listStyle}>
      //     <li className="list-head" style={listItemStyle}>
      //       <h3 style={flex1}>Title</h3>
      //       <h3 style={flex1}>Genre</h3>
      //       <h3 style={flex1}>Stock</h3>
      //       <h3 style={flex1}>Rate</h3>
      //       <h3 style={flex1}></h3>
      //     </li>
      //     {this.state.movies.map((movie) => {
      //       return ListItem(movie, this.deleteMovie);
      //     })}
      //   </ul>
      // </div>
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
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map((movie) => (
                <tr key={movie._id}>
                  <th>{movie.title}</th>
                  <th>{movie.genre.name}</th>
                  <th>{movie.numberInStock}</th>
                  <th>{movie.dailyRentalRate}</th>
                  <th>
                    <Like
                      toggleLike={() => this.toggleLike(movie)}
                      liked={this.state.movies.liked}
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
      </React.Fragment>
    );
  }
}

export default Movie;
