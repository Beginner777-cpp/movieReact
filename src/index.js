import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import Navbar from "./Components/navbar";
import Movie from "./Components/movie";
import Rentals from "./Components/common/rentals";
import Customers from "./Components/common/customers";
import NotFound from './Components/common/notFound';
import MovieId from './Components/common/movieId';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
      <Switch>
        <Route path="/movies/:id" component={MovieId} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/movies" component={Movie} />
        <Route path="/not-found" component={NotFound} />
        <Redirect exact from="/" to="/movies" />
        <Redirect to="/not-found"/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
