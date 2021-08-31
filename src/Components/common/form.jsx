import { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
class Form extends Component {
  validate = () => {
    const errors = {};
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, options);
    if (result.error) {
      for (const error of result.error.details) {
        if (error.message) {
          errors[error.path[0]] = error.message;
        }
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
    this.doSubmit();
  };

  validateProperty = ({ name, value }) => {
    const schema = { [name]: this.schema[name] };
    const result = Joi.validate({ [name]: value }, schema);
    if (result.error) {
      return result.error.details[0].message;
    }
    return null;
  };
  handleChange = ({ currentTarget }) => {
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(currentTarget);
    if (errorMessage) {
      errors[currentTarget.name] = errorMessage;
    } else {
      delete errors[currentTarget.name];
    }

    const account = {
      ...this.state.account,
    };
    account[currentTarget.name] = currentTarget.value;
    this.setState({ account, errors });
  };

  renderInput = (name, label, type="text") => {
    return (
      <Input
        name={name}
        type={type}
        onChange={this.handleChange}
        value={this.state.account[name]}
        label={label}
        errors={this.state.errors[name]}
      />
    );
  };
  renderBtn = () => {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        Submit
      </button>
    );
  };
}

export default Form;
