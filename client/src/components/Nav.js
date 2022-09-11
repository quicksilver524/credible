import React from "react";

function Nav({ id }) {
  // const [yourMom] = useState("yo mama");
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
          <a href="/signup">Signup</a>
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
