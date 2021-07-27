import React, { Component } from "react";
import * as MovieList from "../Data/fakeMovieService.js";
import ListItem from "./listItem.jsx";
class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movies: MovieList.getMovies(),
    };
  }

  render() {
    console.log(this.state);
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
      padding: '20px'
    };
    const flex1 = {
      flex: 1,
    };
    return (
      <div className="container mt-3">
        <p className="">
          Showing {this.state.movies.length} movies in the database
        </p>
        <ul className="" style={listStyle}>
          <li className="list-head" style={listItemStyle}>
            <h3 style={flex1}>Title</h3>
            <h3 style={flex1}>Genre</h3>
            <h3 style={flex1}>Stock</h3>
            <h3 style={flex1}>Rate</h3>
            <h3 style={flex1}></h3>
          </li>
          {this.state.movies.map((movie) => {
            return ListItem(movie);
          })}
        </ul>
      </div>
    );
  }
}

export default Movie;
