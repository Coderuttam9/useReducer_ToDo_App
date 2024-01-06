import React, { Component } from "react";

export default class ClassComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {
        name: "",
        email: "",
        cell: "",
      },
    };
  }

  render() {
    const { name, email, cell } = this.state.input;
    this.handelInputChange = (e) => {
      this.setState((prevState) => ({
        ...prevState,
        input: {
          ...prevState.input,
          [e.target.name]: e.target.value,
        },
      }));
    };

    return (
      <>
        <hr />
        <hr />
        <div className="container">
          <h3> {this.props.title} </h3>
          <input
            type="text "
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handelInputChange}
          />
          <input
            type="text "
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handelInputChange}
          />
          <input
            type="text "
            placeholder="Cell"
            name="cell"
            value={cell}
            onChange={this.handelInputChange}
            className=""
          />
          <button type="submit">Create</button>
        </div>
      </>
    );
  }
}
