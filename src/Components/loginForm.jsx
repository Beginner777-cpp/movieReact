import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
class LoginForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      account: { username: "", password: "" },
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
  
  doSubmit = ()=>{
    console.log('Logged in');
  }
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit} method="GET">
        {this.renderInput('username', 'Username')}
        {this.renderInput('password', 'Password', 'password')}
        {this.renderBtn()}
      </form>
    );
  }
}

export default LoginForm;
