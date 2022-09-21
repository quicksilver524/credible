import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";

function Post() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.thoughts || [];

  return (
    <div className="card-container">
      {posts.map((post) => (
        <div className="card post-card" key={post._id}>
          <h3>{post.username}</h3>
          <p>{post.createdAt}</p>
          <p>{post.thoughtText}</p>
          <button type="button" className="reaction-btn like-btn">
            Like
          </button>
          <button type="button" className="reaction-btn dislike-btn">
            Dislike
          </button>
        </div>
      ))}
    </div>
  );
}

export default Post;
