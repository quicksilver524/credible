//testing semantic ui modal

import React, { useState } from "react";
import { Grid, Button, Form, Image, Modal } from "semantic-ui-react";
import LoginImage from "../images/LoginImage.jpeg";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import AuthService from "../utils/auth";

function LoginModal(props) {
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      AuthService.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });

    setOpen(false);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Already A Friend - Login!</Button>}
    >
      <Modal.Header>Login</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={LoginImage} wrapped />
        <Modal.Description>
          <Form>
            <Form.Input
              fluid
              label="Email"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
            <Form.Input
              label="Password"
              type="password"
              placeholder="password"
              name="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Grid columns={2} relaxed="very">
          <Grid.Column floated="left" width={4}>
            <Button type="submit" color="black" onClick={() => setOpen(false)}>
              I'm Not Credible
            </Button>
          </Grid.Column>
          <Grid.Column floated="right" width={5}>
            <Form.Button
              content="Yep, that's me"
              labelPosition="right"
              icon="checkmark"
              type="submit"
              onSubmit={handleFormSubmit}
              // onClick={(() => setOpen(false))}
              positive
            />
          </Grid.Column>
        </Grid>
        {error && <div>Login failed</div>}
        {/* is this error in the right spot?  */}
      </Modal.Actions>
    </Modal>
  );
}

export default LoginModal;
