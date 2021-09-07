import React from "react";
// import { Redirect } from "react-router";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "./../Data/fakeGenreService";
import { saveMovie, getMovie, getMovies } from "../Data/fakeMovieService";
class New extends Form {
  constructor(props) {
    super(props);
    this.state = {
      account: { name: "", genre: "", numberInStock: "", rate: "" },
      errors: {
        name: "",
        genre: "",
        numberInStock: "",
        rate: "",
      },
    };
    this.movieId = this.props.id;
    this.schema = {
      name: Joi.string().required().label("Title"),
      genre: Joi.string().required().label("Genre"),
      numberInStock: Joi.number()
        .required()
        .integer()
        .greater(0)
        .less(100)
        .label("Number in Stock"),
      rate: Joi.number().required().greater(0).less(10).label("Rate"),
    };
  }
  componentDidMount() {
    let state = { ...this.state };
    let movie = {};
    console.log(getMovies());
    if (this.movieId) {
      let movieDb = getMovie(this.movieId);
      if (!movieDb) {
        this.props.history.replace("/not-found");
        return;
      }
      movie.name = movieDb.title;
      movie.genre = movieDb.genre.name;
      movie.numberInStock = movieDb.numberInStock;
      movie.rate = movieDb.dailyRentalRate;

      state.account = movie;
      this.setState(state);
    }
  }
  doSubmit = () => {
    let newMovie = {
      _id: this.movieId,
      title: this.state.account.name,
      genre: {
        _id: getGenres().filter((g) => g.name === this.state.account.genre)[0]
          ._id,
        name: this.state.account.genre,
      },
      numberInStock: this.state.account.numberInStock,
      dailyRentalRate: this.state.account.rate,
      liked: false,
    };
    let result = saveMovie(newMovie);
    console.log("Added new movie");
    this.props.history.replace("/movies");
    return result;
  };
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit} method="GET">
        <h1>Movie Form</h1>
        {this.renderInput("name", "Title")}
        {this.renderSelect("genre", "Genre", getGenres())}
        {this.renderInput("numberInStock", "Number in Stock", "number")}
        {this.renderInput("rate", "Rate", "number")}
        {this.renderBtn()}
      </form>
    );
  }
}

export default New;
