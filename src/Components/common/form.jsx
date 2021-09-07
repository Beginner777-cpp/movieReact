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

  renderInput = (name, label, type = "text", value = "") => {
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
  renderSelect = (name, label, options, value = "") => {
    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <select
          id={name}
          name={name}
          className="form-select"
          aria-label="Default select example"
          value={this.state.account[name]}
          onChange={this.handleChange}
        >
          <option value=""></option>
          {options.map((option) => (
            <option value={option.name} key={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        {this.state.errors[name] && (
          <div className="alert alert-danger">{this.state.errors[name]}</div>
        )}
      </div>
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
