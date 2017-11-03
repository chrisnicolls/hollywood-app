import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import api from "../api";
// import files
class EditActor extends Component {
  constructor() {
    super();

    this.state = {
      actor: {
        gender: "female"
      }
    };
  }
  // set state

  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        actor: {
          ...state.actor,
          [changeEvent.target.name]: changeEvent.target.value
        }
      };
    });
  };

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    let actorId = this.props.match.params.actorId;

    api.actors.update(actorId, this.state.actor).then(() => {
      this.props.history.push(`/actors/${actorId}`);
    });
  };
  // submiting edited info and pushing user back to actor list

  componentDidMount() {
    let actorId = this.props.match.params.actorId;

    api.actors.getById(actorId).then(actor => {
      if (!actor.id) {
        console.log("No actor here.", actor);
        actor = {};
        this.setState(state => {
          return {
            error: "Unable to fetch actor"
          };
        });
      }
      this.setState(state => {
        return {
          actor: actor
        };
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Edit Actor</h1>
        <Form onSubmit={this.onFormSubmit} unstackable>
          <Form.Group widths={1}>
            <Form.Input
              label="Name"
              value={this.state.actor.name}
              name={"name"}
              placeholder={"name"}
              type={"text"}
              onChange={this.onInputChange}
            />
            <Form.Field
              control={"select"}
              label="Gender"
              value={this.state.actor.gender}
              value={this.state.actor.gender}
              name="gender"
              required
              onChange={this.onInputChange}
            >
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </Form.Field>

            <Form.Input
              label="Date of Birth"
              value={this.state.actor.born}
              name={"born"}
              placeholder={"DOB"}
              type={"date"}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group widths={1}>
            <Form.Input
              label="Age"
              value={this.state.actor.age}
              name={"age"}
              placeholder={"age"}
              type={"number"}
              onChange={this.onInputChange}
            />

            <Form.Input
              label="Hometown"
              value={this.state.actor.hometown}
              name={"hometown"}
              placeholder={"Hometown"}
              type={"text"}
              onChange={this.onInputChange}
            />
            <Form.Input
              label="Profile Picture"
              value={this.state.actor.profilePic}
              name={"profilePic"}
              placeholder={"Profile Picture"}
              type={"text"}
              onChange={this.onInputChange}
            />
            <Form.Input
              label="Bio"
              value={this.state.actor.bio}
              name={"bio"}
              placeholder={"BIO"}
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

export default EditActor;
