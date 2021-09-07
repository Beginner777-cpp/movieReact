import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

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
  doSubmit = () => {
    console.log("Registered");
  };
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit} method="GET">
        <h1>Register</h1>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderBtn()}
      </form>
    );
  }
}
export default Registration;
