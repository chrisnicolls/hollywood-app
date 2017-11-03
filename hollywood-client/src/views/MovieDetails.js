import React, { Component } from "react";
import api from "../api";
import { Link } from "react-router-dom";
// importing files
class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      error: false
    };
  }

  componentDidMount() {
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
      // creating error to go off if info is incorrect
      this.setState(state => {
        return {
          movie: movie
        };
      });
    });
  }

  render() {
    let { movie, error } = this.state;
    return (
      <div>
        <h1>Movie Details</h1>
        {error && <div>{error}</div>}
        {!error && (
          <div>
            <Link to={`/movies/${movie.id}/edit`}>Edit</Link>
            <h3>{movie.title}</h3>
            <div>
              <img src={movie.poster} alt={"Movie Poster"} />
            </div>
            <p>
              <b>
                <u>Summary:</u>{" "}
              </b>{" "}
              {movie.summary}
            </p>

            <div>
              <b>
                <u>Rating:</u>
              </b>{" "}
              {movie.rating}
            </div>
            <div>
              <b>
                <u>Run Time:</u>
              </b>{" "}
              {movie.runTime} minutes
            </div>
            <div>
              <b>
                <u>Release Date:</u>
              </b>{" "}
              {movie.releaseDate}
            </div>
            <br />
            <div>
              <h4>
                <i>Box Office</i>
              </h4>
            </div>
            <div>
              <b>Gross:</b> ${movie.grossProfit}
            </div>
            <br />
            <div>
              <b>
                <u>Rotten Tomatoes:</u>
              </b>{" "}
              {movie.rottenTomatoes}%
            </div>
            <hr />
            {movie.actors &&
              movie.actors.map(actor => (
                <div>
                  <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}
// showing content on page

export default MovieDetails;
