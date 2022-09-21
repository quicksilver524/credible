import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";

function Post() {
  const { loading, data } = useQuery(QUERY_POSTS);
  console.log(data);
  const posts = data?.thoughts || [];

  return (
    <div className="card-container">
      {posts.map((post) => (
        <div className="card" key={post._id}>
          <h3>{post.username}</h3>
          <p>{post.createdAt}</p>
          <p>{post.thoughtText}</p>
        </div>
      ))}
    </div>
  );
}

export default Post;
