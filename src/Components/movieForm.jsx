import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMovie, getMovie } from "../services/movieService";
import getGenres from "../services/genreService.js";
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
      _id: Joi.string().allow(""),
      title: Joi.string().required().label("Title").min(5),
      genre: Joi.string().required().label("Genre"),
      numberInStock: Joi.number()
        .required()
        .integer()
        .min(0)
        .max(100)
        .label("Number in Stock"),
      rate: Joi.number().required().min(0).max(10).label("Rate"),
    };
    this.genres = [];
  }
  async populateGenres() {
    const { data } = await getGenres();
    this.genres = data;
  }
  async populateMovies() {
    let movieId = this.props.id;
    this.movieId = movieId;
    let movie = {};
    if (movieId) {
      let movieDb = await getMovie(movieId);
      if (!movieDb) {
        this.props.history.replace("/not-found");
        return;
      }
      movie._id = movieId;
      movie.title = movieDb.title;
      movie.genre = movieDb.genre.name;
      movie.numberInStock = movieDb.numberInStock;
      movie.rate = movieDb.dailyRentalRate;
      this.setState({ data: movie });
    }
  }
  async componentDidMount() {
    this.populateGenres();
    this.populateMovies();
  }
  doSubmit = async () => {
    let newMovie = {
      _id: this.movieId,
      title: this.state.data.title,
      genre: {
        _id: this.genres.filter((g) => g.name === this.state.data.genre)[0]._id,
        name: this.state.data.genre,
      },
      numberInStock: this.state.data.numberInStock,
      dailyRentalRate: this.state.data.rate,
      liked: false,
    };
    let result = await saveMovie(newMovie);
    this.props.history.replace("/movies");
    return result;
  };
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit} method="GET">
        <h1>Movie Form</h1>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genre", "Genre", this.genres)}
        {this.renderInput("numberInStock", "Number in Stock", "number")}
        {this.renderInput("rate", "Rate", "number")}
        {this.renderBtn()}
      </form>
    );
  }
}

export default MovieForm;
