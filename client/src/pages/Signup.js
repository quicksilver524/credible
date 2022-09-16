import React, { useState } from "react";
import { validateEmail } from "../utils/helpers";
import Login from "../components/Login";

function Signup() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrorMessage, setFormErrorMessage] = useState("");
  function handleInputChange(e) {
    if (e.target.name === "signup-email") {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setFormErrorMessage("please enter a valid email address!");
      } else {
        setFormErrorMessage("");
        setFormState(...formState, { [e.target.name]: e.target.value });
      }
    } else {
      if (!e.target.value.length) {
        setFormErrorMessage(`${e.targe.name} is required!`);
      } else {
        setFormState(...formState, { [e.target.name]: e.target.value });
      }
    }
  }
  return (
    <div id="signup-container">
      <form id="signup-form">
        <label for="signup-username">username: </label>
        <input
          id="signup-username"
          name="signup-username"
          placeholder="username"
          onBlur={handleInputChange}
        />
        <label for="signup-email">email: </label>
        <input
          id="signup-email"
          name="signup-email"
          placeholder="email"
          onBlur={handleInputChange}
        />
        <label for="signup-password">password: </label>
        <input
          id="singup-password"
          name="signup-password"
          placeholder="password"
          onBlur={handleInputChange}
        />
        <p>error: {formErrorMessage}</p>
        <button type="submit" id="sign-up-button">
          sign up!
        </button>
      </form>
      <Login id="log-in-button" />
      {/* <button type="submit" id="log-in-button">
        Already A Friend - Login!
        {/* put in code to pop up login modal if they click this  */}
      {/* </button> */}
    </div>
  );
}

export default Signup;
