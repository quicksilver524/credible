import React from "react";
import AuthService from "../utils/auth";

function Nav({ id }) {
  // const [yourMom] = useState("yo mama");
  const loggedIn = AuthService.loggedIn();

  if (!loggedIn) {
    return (
      <header id={id}>
        <a href="/">
          <h1>credible</h1>
        </a>
        <ul>
          <li>
            <a href="/signup">Signup</a>
          </li>
        </ul>
      </header>
    );
  }

  return (
    <header id={id}>
      <a href="/">
        <h1>credible</h1>
      </a>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/signout">Sign Out</a>
          {/* todo fix to be evnt listener sign out functionality */}
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
