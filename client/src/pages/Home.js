import React, { useState } from "react";
import PostCreate from "../components/PostCreate";
import Post from "../components/Post";
import Store from "../components/Store";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import AuthService from "../utils/auth";
import { Navigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_POSTS } from "../utils/queries";

const Home = () => {
  const [storeState, setStoreState] = useState(false);
  const { data } = useQuery(QUERY_POSTS);
  const { data: userData } = useQuery(QUERY_ME);
  const thoughts = data?.thoughts || [];
  console.log(thoughts, userData);

  const loggedIn = AuthService.loggedIn();

  if (!loggedIn) {
    return <Navigate to="/signup" />;
  }

  return (
    <div>
      <Nav id="nav-section" userData={userData} storeState={storeState} setStoreState={setStoreState} />
      <main>
        <div id="main-section-home">
          {!storeState && (
            <div>
              <PostCreate />
            </div>
          )}
          {!storeState && (
            <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
              <Post />
            </div>
          )}
          {storeState && (
            <div>
              <Store />
            </div>
          )}
        </div>
      </main>
      <Footer id="footer-section" />
    </div>
  );
};

export default Home;
