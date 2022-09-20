import { React, Redirect } from "react";
import { useState } from "react";

import AuthService from "../utils/auth";

import { Modal, ModalContent } from "semantic-ui-react";

function Nav(id) {
  const [open, setOpen] = React.useState(false);
  // const [yourMom] = useState("yo mama");
  // const loggedIn = AuthService.loggedIn();

  // submit signout  form
  const signOutFormSubmit = async (e) => {
    e.preventDefault();
    const navigateOut = () => {
      <Redirect to="/signup" />;
    };
    console.log("signOutFormSubmit signout clicked");
    AuthService.logout();
    navigateOut();
  };

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
            onClose={signOutFormSubmit}
            trigger={<p id="signout-btn">sign out</p>}
          >
            <ModalContent>see you again soon!</ModalContent>
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
