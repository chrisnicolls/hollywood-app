import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";
// importing files
class ListMovies extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      error: false
    };
  }
  // setting state

  componentDidMount() {
    api.movies.getAll().then(movies => {
      if (!movies.length && movies.length !== 0) {
        console.log("Return Value was not an Array of Movies.", movies);
        movies = [];

        this.setState(state => {
          return {
            error: "Unable to Fetch Movies."
          };
        });
      }
      // creating error if unable to fetch info

      this.setState(state => {
        return {
          movies: movies
        };
      });
    });
  }

  render() {
    let { movies, error } = this.state;

    return (
      <div>
        <h1>List Movies</h1>
        <Link style={{ float: "right" }} to={`/movies/new`}>
          New Movie
        </Link>
        {error && <div>{error}</div>}
        {movies.map(m => (
          <div style={{ padding: 10 }} key={m.id}>
            <Link to={`/movies/${m.id}`}>
              {m.title} - {m.actors.length} Actors
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
// show movies on page

export default ListMovies;
