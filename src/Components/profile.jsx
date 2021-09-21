import { extend } from "lodash";
import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    this.setState({ user: this.props.user });
  }
  render() {
    return (
      <div>
        <h1>Profile</h1>
        {this.state.user ? this.state.user["name"] : null}
      </div>
    );
  }
}
export default Profile;
