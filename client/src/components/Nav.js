import React from "react";
import AuthService from "../utils/auth";
import { Modal, Icon } from "semantic-ui-react";

function Nav({ id, userData }) {
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
  console.log(userData);
  const points = userData?.me?.points || "I am running a naked mile.";

  const navOut = async (event) => {
    event.preventDefault();
    setOpen(false);
    AuthService.logout();
  };

  return (
    <header id={id} className="home-header">
      <a href="/" id="nav-header">
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
        <li>{points} credits</li>
        <li>
          <button type="button">
            <h2>Buy Credits!</h2>
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Nav;
