import React from "react";
import AuthService from "../utils/auth";
import { Modal, Icon } from "semantic-ui-react";

function Nav({ id }) {
  const [open, setOpen] = React.useState(false);
  // const [yourMom] = useState("yo mama");
  // const loggedIn = AuthService.loggedIn();

  // if (!loggedIn) {
  //   return (
  //     <header id={id}>
  //       <a href="/">
  //         <h1>credible</h1>
  //       </a>
  //       <ul>
  //         <li>
  //           <a href="/signup">Signup</a>
  //         </li>
  //       </ul>
  //     </header>
  //   );
  // }

  const navOut = async (event) => {
    event.preventDefault();
    setOpen(false);
    AuthService.logout();
  };

  return (
    <header id={id}>
      <a href="/">
        <h1>credible</h1>
      </a>
      <ul>
        {/* <li>
          <a href="/">Home</a>
        </li> */}
        <li>
          <Modal
            onClose={() => {
              navOut();
            }}
            onOpen={() => setOpen(true)}
            open={open}
            size="small"
            trigger={<p>Sign Out</p>}
          >
            <Modal.Content>
              see you again soon!
              <span>{<Icon name="close" onClick={navOut} />}</span>
            </Modal.Content>
          </Modal>
        </li>
        <li>
          <button type="button">
            <h2>Buy Credits!</h2>
          </button>
        </li>
        <li>
          <button type="button">
            <h2>Credit Store</h2>
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Nav;
