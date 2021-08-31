import React, { Component } from "react";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default LoginForm;
