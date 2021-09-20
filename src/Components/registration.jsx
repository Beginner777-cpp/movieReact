import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { addUser } from "../services/userService";
import auth from "../services/authService";
class Registration extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { username: "", password: "", name: "" },
      errors: {
        username: "",
        password: "",
        name: "",
      },
    };
    this.emailOptions = {
      minDomainSegments: 2,
    };
    this.schema = {
      username: Joi.string()
        .required()
        .email(this.emailOptions)
        .label("Username"),
      password: Joi.string().min(5).required().label("Password"),
      name: Joi.string().required().label("Name"),
    };
  }
  doSubmit = async () => {
    const { data } = this.state;
    const user = {
      name: data.name,
      email: data.username,
      password: data.password,
    };
    try {
      const response = await addUser(user);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ errors: { username: error.response.data } });
      }
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit} method="GET">
        <h1>Register</h1>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderBtn("Register")}
      </form>
    );
  }
}
export default Registration;
