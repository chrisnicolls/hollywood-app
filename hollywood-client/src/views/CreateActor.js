import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import api from "../api";
// importing files
class CreateActor extends Component {
  constructor() {
    super();

    this.state = {
      actor: {
        gender: "female"
      }
    };
  }
  //creating state

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

    api.actors.create(this.state.actor).then(() => {
      this.props.history.push("/actors");
    });
  };
  // submit and push to actors page

  render() {
    return (
      <div>
        <Form onSubmit={this.onFormSubmit} unstackable>
          <h1>Create Actor</h1>
          <Form.Group widths={1}>
            <Form.Input
              label="Name"
              name={"name"}
              placeholder={"name"}
              type={"text"}
              onChange={this.onInputChange}
            />
            <Form.Field
              control={"select"}
              label="Gender"
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
              name={"born"}
              placeholder={"DOB"}
              type={"date"}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group widths={1}>
            <Form.Input
              label="Age"
              name={"age"}
              placeholder={"age"}
              type={"number"}
              onChange={this.onInputChange}
            />

            <Form.Input
              label="Hometown"
              name={"hometown"}
              placeholder={"Hometown"}
              type={"text"}
              onChange={this.onInputChange}
            />
            <Form.Input
              label="Profile Picture"
              name={"profilePic"}
              placeholder={"Profile Picture"}
              type={"text"}
              onChange={this.onInputChange}
            />
            <Form.Input
              label="Bio"
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

// show info on page

export default CreateActor;
