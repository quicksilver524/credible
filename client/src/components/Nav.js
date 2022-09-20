import React from "react";

import AuthService from "../utils/auth";

import { Modal, ModalContent } from "semantic-ui-react";

function Nav(id) {
  // const loggedIn = AuthService.loggedIn();

  // submit signout  form
  // const signOutFormSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log("signOutFormSubmit signout clicked");
  //   AuthService.logout();
  //   // navigateOut();
  // };

  // const navigateOut = () => {
  //   <Redirect to="/signup" />;
  // };
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
            // onOpen={AuthService.logout()}
            onClose={AuthService.logout()}
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
