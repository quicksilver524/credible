import "./App.css";
// import Nav from "./components/Nav";
// import Footer from "./components/Footer";
// import PostCreate from "./components/PostCreate";
// import Post from "./components/Post";
// import Store from "./components/Store";
//! ^ moved to home page and only main references here
import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
// import Login from "./pages/Login";
// import NoMatch from "./pages/NoMatch";
//todo ^ update if prefer a nomatch instead of signup like I made it
import Signup from "./pages/Signup";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <main id="main-section">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <PostCreate />
              <Post />
              <Store /> */}
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="*" element={<Signup />} /> */}
            </Routes>
          </main>
          {/* <Footer id="footer-section" /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
