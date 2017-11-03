import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import api from "../api";
// import files
class EditMovie extends Component {
  constructor() {
    super();

    this.state = {
      actors: [],
      error: false,
      movie: {
        rating: "G"
      }
    };
  }
  // set state
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

    let movieId = this.props.match.params.movieId;

    api.movies.update(movieId, this.state.movie).then(() => {
      this.props.history.push(`/movies/${movieId}`);
    });
  };
  // submiting edit and pushing to movies list

  componentDidMount() {
    this.fetchMovieAndActors();
  }

  fetchMovieAndActors = () => {
    let movieId = this.props.match.params.movieId;

    api.movies.getById(movieId).then(movie => {
      if (!movie.id) {
        console.log("This is not the movie you were looking for.", movie);

        this.setState(state => {
          return {
            error: "Unable to fetch movie."
          };
        });
      }
      this.setState(state => {
        return {
          movie: movie
        };
      });
      api.actors.getAll().then(actors => {
        if (!actors.length && actors.length !== 0) {
          return;
        }
        this.setState(state => {
          return {
            actors: actors
          };
        });
      });
    });
  };

  // getting movie by ID and actor info

  addToCast = id => {
    let movieId = this.props.match.params.movieId;
    api.movies.addActor(movieId, { id: id }).then(() => {
      this.fetchMovieAndActors();
    });
  };
  // creating function to attach new actor to movie (relationship)

  removeFromCast = id => {
    let movieId = this.props.match.params.movieId;
    api.movies.removeActor(movieId, { id: id }).then(() => {
      this.fetchMovieAndActors();
    });
  };
  // creating function to detach actor from movie (relationship)

  render() {
    return (
      <div>
        <h1>Edit Movie</h1>
        <Form onSubmit={this.onFormSubmit} unstackable>
          <Form.Group widths={1}>
            <Form.Input
              label="Title"
              value={this.state.movie.title}
              name={"title"}
              placeholder={"title"}
              type={"text"}
              onChange={this.onInputChange}
            />
            <Form.Field
              label="Rating"
              value={this.state.movie.rating}
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
              value={this.state.movie.rottenTomatoes}
              min={0}
              max={100}
              name={"rottenTomatoes"}
              placeholder={"rottenTomatoes"}
              type={"number"}
              onChange={this.onInputChange}
            />

            <Form.Input
              label="Release Date"
              value={this.state.movie.releaseDate}
              name={"releaseDate"}
              placeholder={"Release Date"}
              type={"date"}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group widths={1}>
            <Form.Input
              label="Run Time (minutes)"
              value={this.state.movie.runTime}
              name={"runTime"}
              placeholder={"Run Time "}
              type={"number"}
              onChange={this.onInputChange}
            />
            <Form.Input
              label="Gross Profit"
              value={this.state.movie.grossProfit}
              name={"grossProfit"}
              placeholder={"Gross Profit"}
              type={"number"}
              onChange={this.onInputChange}
            />
            <Form.Input
              label="Poster"
              value={this.state.movie.poster}
              name={"poster"}
              placeholder={"poster"}
              type={"text"}
              onChange={this.onInputChange}
            />
            <Form.Input
              label="Summary"
              value={this.state.movie.summary}
              name={"summary"}
              placeholder={"summary"}
              type={"text"}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        <hr />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            {this.state.movie.actors &&
              this.state.movie.actors.map(a => (
                <div>
                  {a.name}{" "}
                  <button onClick={() => this.removeFromCast(a.id)}>
                    Fire
                  </button>
                </div>
              ))}
          </div>
          <div style={{ flex: 1 }}>
            {this.state.actors &&
              this.state.actors.map(a => (
                <div>
                  {a.name}{" "}
                  <button onClick={() => this.addToCast(a.id)}>Cast</button>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

// edit form, use to edit and return to movie list

export default EditMovie;
