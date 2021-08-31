import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/navbar";
import Movie from "./Components/movie";
import Rentals from "./Components/common/rentals";
import Customers from "./Components/common/customers";
import NotFound from "./Components/common/notFound";
import MovieId from "./Components/common/movieId";
import LoginForm from "./Components/loginForm";
import Registration from "./Components/registration";
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/movies/:id" component={MovieId} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/login" component={LoginForm} />
        <Route path="/registration" component={Registration} />
        <Route path="/movies" component={Movie} />
        <Route path="/not-found" component={NotFound} />
        <Redirect exact from="/" to="/movies" />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
