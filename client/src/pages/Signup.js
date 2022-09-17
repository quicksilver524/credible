import React, { useState } from "react";
import { validateEmail } from "../utils/helpers";
import Login from "../components/Login";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import AuthService from "../utils/auth";

function Signup() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [addUser, { error }] = useMutation(ADD_USER);
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
        setFormErrorMessage(`${e.target.name} is required!`);
      } else {
        setFormState(...formState, { [e.target.name]: e.target.value });
      }
    }
  }

  // submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();

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
      <form id="signup-form" onSubmit={handleFormSubmit}>
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
        {error && <p>error: {formErrorMessage}</p>}
        <button type="submit" id="sign-up-button">
          sign up!
        </button>
      </form>
      <Login id="log-in-button" />
      {/* login functionality is in the login component  */}
    </div>
  );
}

export default Signup;
