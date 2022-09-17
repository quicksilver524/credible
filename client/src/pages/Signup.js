import React, { useState } from "react";
import { validateEmail } from "../utils/helpers";
import Login from "../components/Login";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import AuthService from "../utils/auth";

function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [addUser, { error }] = useMutation(ADD_USER);
  function handleInputChange(e) {
    console.log("handle change activated")
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
        setFormErrorMessage(`${e.target.name} is required!`);
      } else {
        setFormState(...formState, { [e.target.name]: e.target.value });
      }
    }
  }

  // submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
console.log("handleformsubmit signup clicked");
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      AuthService.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="signup-container">
      <form onSubmit={handleFormSubmit} id="signup-form">
        <label for="username">username: </label>
        <input
          name="username"
          type="username"
          id="username"
          placeholder="username"
          onBlur={handleInputChange}
        />
        <label for="email">email: </label>
        <input
          name="email"
          type="email"
          id="email"
          placeholder="email"
          onBlur={handleInputChange}
        />
        <label for="password">password: </label>
        <input
          name="password"
          type="password"
          id="password"
          placeholder="password"
          onBlur={handleInputChange}
        />
        <button type="submit" id="sign-up-button">
          sign up!
        </button>
      </form>
      {error && <p>error: {formErrorMessage}</p>}
      <Login id="log-in-button" />
      {/* note: login functionality is in the login component  */}
    </div>
  );
}

export default Signup;
