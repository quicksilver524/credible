//teesting semantic ui modal

import React from "react";
import { Button, Form, Image, Modal } from "semantic-ui-react";

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
        <Image size="medium" src="/images/avatar/large/rachel.png" wrapped />
        {/* ^update to what we want */}
        <Modal.Description>
          <Form>
            <Form.Input fluid label="Email" type="email" placeholder="Email" />
            <Form.Input label="Enter Password" type="password" />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button type="submit" color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Form.Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default LoginModal;
