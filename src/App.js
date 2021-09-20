import React, { Component } from "react";

import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./Components/navbar";
import Movie from "./Components/movie";
import Rentals from "./Components/common/rentals";
import Customers from "./Components/common/customers";
import NotFound from "./Components/common/notFound";
import MovieId from "./Components/common/movieId";
import LoginForm from "./Components/loginForm";
import Registration from "./Components/registration";
import MovieForm from "./Components/movieForm";
import Profile from "./Components/profile";
import Logout from "./Components/logout";
import ProtectedRoute from "./Components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    this.setState({ user: auth.getUser() });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <Switch>
          <Route path="/movies/new" component={MovieForm} />
          <ProtectedRoute path="/movies/:id" component={MovieId} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/registration" component={Registration} />
          <Route path="/profile" render={() => <Profile user={user} />} />
          <Route
            path="/movies"
            render={(props) => <Movie {...props} user={user} />}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
