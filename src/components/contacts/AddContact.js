import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
//import * as uuid from "uuid";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {},
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    //Check For Errors
    if (name === "") {
      this.setState({ errors: { name: "Name is req." } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is req." } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is req." } });
      return;
    }

    const newContact = {
      //id: uuid.v4(),
      name,
      email,
      phone,
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );

    dispatch({ type: "ADD_CONTACT", payload: res.data });
    //dispatch({ type: "ADD_CONTACT", payload: newContact });

    //clear state
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {},
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter name.."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  ></TextInputGroup>
                  <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter email.."
                    value={email}
                    onChange={this.onChange}
                    type="email"
                    error={errors.email}
                  ></TextInputGroup>
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter phone.."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  ></TextInputGroup>
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block btn-light"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
