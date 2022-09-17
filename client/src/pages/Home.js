import React from "react";
import PostCreate from "../components/PostCreate";
import Post from "../components/Post";
import Store from "../components/Store";
import Nav from "../components/Nav";
import AuthService from "../utils/auth";
import { Navigate } from "react-router-dom";

// import { useQuery } from "@apollo/client";
// import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
//todo ^ if we want to do query based loading of posts

const Home = () => {
  //   const { loading, data } = useQuery(QUERY_THOUGHTS);
  //   const { data: userData } = useQuery(QUERY_ME_BASIC);
  //   const thoughts = data?.thoughts || [];

  const loggedIn = AuthService.loggedIn();

  if (!loggedIn) {
    return <Navigate to="/signup" />;
  }

  return (
    <div>
      <Nav id="nav-section" />
      <main>
        <div id="main-section-home">
          <div>
            <PostCreate />
          </div>
          <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
            {/* {loading ? (
              <div>Loading...</div>
            ) : ( */}
            <Post />
            {/* )} */}
          </div>
          {/* {loggedIn && userData ? ( */}
          {/* //todo ^ either use just loggedin if no query method or both if doing
          queries */}
          <div>
            <Store />
          </div>
          {/* ) : null} */}
        </div>
      </main>
    </div>
  );
};

export default Home;
