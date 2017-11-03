import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import api from "../api";
// import files
class CreateMovie extends Component {
  constructor() {
    super();

    this.state = {
      movie: {
        rating: "G"
      }
    };
  }

  onInputChange = changeEvent => {
    changeEvent.persist();

    console.log(changeEvent.target.value);

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
  // create component and push to page
  render() {
    return (
      <div>
        <h1>Create Movie</h1>

        <Form onSubmit={this.onFormSubmit} unstackable>
          <Form.Group widths={1}>
            <Form.Input
              label="Title"
              name={"title"}
              placeholder={"title"}
              type={"text"}
              onChange={this.onInputChange}
            />
            <Form.Field
              label="Rating"
              control={"select"}
              value={this.state.movie.rating}
              name="rating"
              required
              onChange={this.onInputChange}
            >
              <option value={"G"}>G</option>
              <option value={"PG"}>PG</option>
              <option value={"PG-13"}>PG-13</option>
              <option value={"NC-17"}>NC-17</option>
              <option value={"R"}>R</option>
              <option value={"NR"}>NR</option>
            </Form.Field>
            <Form.Input
              label="Rotten Tomatoes Rating"
              min={0}
              max={100}
              name={"rottenTomatoes"}
              placeholder={"rottenTomatoes"}
              type={"number"}
              onChange={this.onInputChange}
            />

            <Form.Input
              label="Release Date"
              name={"releaseDate"}
              placeholder={"Release Date"}
              type={"date"}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group widths={1}>
            <Form.Input
              label="Run Time (minutes)"
              name={"runTime"}
              placeholder={"Run Time "}
              type={"number"}
              onChange={this.onInputChange}
            />
            <Form.Input
              label="Gross Profit"
              name={"grossProfit"}
              placeholder={"Gross Profit"}
              type={"number"}
              onChange={this.onInputChange}
            />
            <Form.Input
              label="Poster"
              name={"poster"}
              placeholder={"poster"}
              type={"text"}
              onChange={this.onInputChange}
            />
            <Form.Input
              label="Summary"
              name={"summary"}
              placeholder={"summary"}
              type={"text"}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

// show info on page

export default CreateMovie;
