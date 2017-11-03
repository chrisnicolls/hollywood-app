import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";
// importing files
class ListActors extends Component {
  constructor() {
    super();

    this.state = {
      actors: [],
      error: false
    };
  }
  // set state

  componentDidMount() {
    api.actors.getAll().then(actors => {
      if (!actors.length && actors.length !== 0) {
        console.log("Return Value was not an Array of Actors.", actors);
        actors = [];

        this.setState(state => {
          return {
            error: "Unable to Fetch Actors."
          };
        });
      }
      // setting error catches
      this.setState(state => {
        return {
          actors: actors
        };
      });
    });
  }

  render() {
    let { actors, error } = this.state;

    return (
      <div>
        <h1>List Actors</h1>
        <Link style={{ float: "right" }} to={`/actors/new`}>
          New Actor
        </Link>
        {error && <div>{error}</div>}
        {actors.map(a => (
          <div style={{ padding: 10 }} key={a.id}>
            <Link to={`/actors/${a.id}`}>
              {a.name} - {a.movies.length} Movies
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
// list information

export default ListActors;
