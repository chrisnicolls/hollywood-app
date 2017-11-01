import React, { Component } from "react";
import api from "../api";

class CreateMovie extends Component {
  constructor() {
    super();

    this.state = {
      movie: {}
    };
  }

  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        movie: {
          ...state.movie,
          [changeEvent.target.name]: changeEvent.target.value
        }
      };
    });
  };

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    api.movies.create(this.state.movie).then(() => {
      this.props.history.push("/movies");
    });
  };

  render() {
    return (
      <div>
        <h1>Create Movie</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            name={"title"}
            placeholder={"title"}
            type={"text"}
            onChange={this.onInputChange}
          />
          <input
            name={"rating"}
            placeholder={"rating"}
            type={"text"}
            onChange={this.onInputChange}
          />
          <input
            min={0}
            max={100}
            name={"rottenTomatoes"}
            placeholder={"rottenTomatoes"}
            type={"number"}
            onChange={this.onInputChange}
          />
          <input
            name={"poster"}
            placeholder={"poster"}
            type={"text"}
            onChange={this.onInputChange}
          />
          <input
            name={"summary"}
            placeholder={"summary"}
            type={"text"}
            onChange={this.onInputChange}
          />
          <input type={"submit"} />
        </form>
      </div>
    );
  }
}

export default CreateMovie;
