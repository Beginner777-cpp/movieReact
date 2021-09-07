import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../Data/fakeGenreService";
import { saveMovie, getMovie } from "../Data/fakeMovieService";
class MovieForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { _id: "", title: "", genre: "", numberInStock: "", rate: "" },
      errors: {
        _id: "",
        title: "",
        genre: "",
        numberInStock: "",
        rate: "",
      },
    };
    this.schema = {
      _id: Joi.string().allow(''),
      title: Joi.string().required().label("Title"),
      genre: Joi.string().required().label("Genre"),
      numberInStock: Joi.number()
        .required()
        .integer()
        .min(0)
        .max(100)
        .label("Number in Stock"),
      rate: Joi.number().required().min(0).max(10).label("Rate"),
    };
  }
  componentDidMount() {
    let movieId = this.props.id;
    let movie = {};
    if (movieId) {
      let movieDb = getMovie(movieId);
      if (!movieDb) {
        this.props.history.replace("/not-found");
        return;
      }
      movie._id = movieId;
      movie.title = movieDb.title;
      movie.genre = movieDb.genre.name;
      movie.numberInStock = movieDb.numberInStock;
      movie.rate = movieDb.dailyRentalRate;

      console.log(movie);
      this.setState({ data: movie });
    }
  }
  doSubmit = () => {
    let newMovie = {
      _id: this.movieId,
      title: this.state.data.title,
      genre: {
        _id: getGenres().filter((g) => g.name === this.state.data.genre)[0]._id,
        name: this.state.data.genre,
      },
      numberInStock: this.state.data.numberInStock,
      dailyRentalRate: this.state.data.rate,
      liked: false,
    };
    let result = saveMovie(newMovie);
    this.props.history.replace("/movies");
    return result;
  };
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit} method="GET">
        <h1>Movie Form</h1>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genre", "Genre", getGenres())}
        {this.renderInput("numberInStock", "Number in Stock", "number")}
        {this.renderInput("rate", "Rate", "number")}
        {this.renderBtn()}
      </form>
    );
  }
}

export default MovieForm;
