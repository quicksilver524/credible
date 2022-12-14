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
    // console.log("handleformsubmit clicked");
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      AuthService.login(data.login.token);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button id="login-btn">already a friend - login!</Button>}
    >
      <Modal.Header>login</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={LoginImage} wrapped />
        <Form onSubmit={handleFormSubmit}>
          <Modal.Description>
            <Form.Input
              fluid
              label="email"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
            <Form.Input
              label="password"
              type="password"
              placeholder="password"
              name="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
          </Modal.Description>

          <Modal.Actions>
            <Grid columns={2} relaxed="very">
              <Grid.Column floated="left" width={4}>
                <Button
                  id="login-btn"
                  type="submit"
                  color="black"
                  onClick={() => setOpen(false)}
                >
                  I'm not credible
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={7}>
                <Form.Button
                  id="login-btn-yes"
                  content="yep, that's me"
                  labelPosition="right"
                  icon="checkmark"
                  type="submit"
                />
              </Grid.Column>
            </Grid>
            {error && <div>{error.message}</div>}
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default LoginModal;
