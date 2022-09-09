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
          <button type="button">Buy Credits!</button>
        </li>
        <li>
          <button type="button">Credit Store</button>
        </li>
      </ul>
    </header>
  );
}

export default Nav;
