import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import api from "../api";
import { Link } from "react-router-dom";
// importing files
class ActorDetails extends Component {
  constructor() {
    super();

    this.state = {
      actor: {},
      error: false
    };
  }
  // creating state
  componentDidMount() {
    let actorId = this.props.match.params.actorId;

    api.actors.getById(actorId).then(actor => {
      if (!actor.id) {
        console.log("This is not the actor you were looking for.", actor);

        this.setState(state => {
          return {
            error: "Unable to fetch actor."
          };
        });
      }
      // if no id is found, then it throws a specific error
      this.setState(state => {
        return {
          actor: actor
        };
      });
    });
  }

  render() {
    let { actor, error } = this.state;
    return (
      <div>
        <h1>Actor Details</h1>

        {error && <div>{error}</div>}
        {!error && (
          <div>
            <Link to={`/actors/${actor.id}/edit`}>Edit</Link>

            <Card>
              <img src={actor.profilePic} alt="Profile Picture" />
              <Card.Content>
                <Card.Header>{actor.name}</Card.Header>
                <Card.Meta>
                  <span className="date">
                    <div>{actor.age}</div>
                  </span>
                </Card.Meta>
                <Card.Description>
                  <div>{actor.gender}</div>
                </Card.Description>
              </Card.Content>
            </Card>
            <Card.Group>
              <Card fluid color="red" header={actor.born} />
              <Card fluid color="orange" header={actor.hometown} />
              <Card fluid color="yellow" header={actor.bio} />
            </Card.Group>

            <hr />
            {actor.movies &&
              actor.movies.map(m => (
                <div>
                  <Link to={`/movies/${m.id}`}>{m.title}</Link>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}
// displaying information

export default ActorDetails;
