//teesting semantic ui modal

import React from "react";
import { Grid, Button, Form, Image, Modal } from "semantic-ui-react";
import LoginImage from "../images/LoginImage1.jpg";

function LoginModal() {
  const [open, setOpen] = React.useState(false);

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
            <Form.Input fluid label="Email" type="email" placeholder="Email" />
            <Form.Input
              label="Password"
              type="password"
              placeholder="password"
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
              onClick={() => setOpen(false)}
              positive
            />
          </Grid.Column>
        </Grid>
      </Modal.Actions>
    </Modal>
  );
}

export default LoginModal;
