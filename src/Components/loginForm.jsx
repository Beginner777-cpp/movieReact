import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { authUser } from "../services/authService";
class LoginForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { username: "", password: "" },
      errors: {
        username: "",
        password: "",
      },
    };
    this.schema = {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
    };
  }
  componentDidMount() {
    // this.username.current.focus();
  }

  doSubmit = async (data) => {
    console.log("Logged in");
    const user = {
      email: data.username,
      password: data.password,
    };
    try {
      let {data: token} = await authUser(user);
      localStorage.setItem('token', token);
      this.props.history.push('/')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ errors: { username: error.response.data } });
      }
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit} method="GET">
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderBtn()}
      </form>
    );
  }
}

export default LoginForm;
