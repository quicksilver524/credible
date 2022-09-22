import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import {
  LIKE_THOUGHT,
  DISLIKE_THOUGHT,
  ADD_REACTION,
} from "../utils/mutations";
import CommentSection from "./Comment";

function Post() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.thoughts || [];
  const [likeThought, { likeError }] = useMutation(LIKE_THOUGHT);
  const [dislikeThought, { dislikeError }] = useMutation(DISLIKE_THOUGHT);
  const [addReaction, { reactionError }] = useMutation(ADD_REACTION);

  const handleLikeClick = async (e) => {
    try {
      console.log(e.target.id);
      await likeThought({
        variables: { thoughtId: e.target.id.substring(3) },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislikeClick = async (e) => {
    try {
      await dislikeThought({
        variables: { thoughtId: e.target.id.substring(3) },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card-container">
      {posts.map((post) => (
        <div className="card post-card" key={post._id}>
          <h3>{post.username}</h3>
          <p>{post.createdAt}</p>
          <p>{post.thoughtText}</p>
          <div className="likeContainer">
            <div>
              <p>{post.likeCount - post.dislikeCount} likes</p>
              <button
                type="button"
                className="reaction-btn like-btn"
                onClick={handleLikeClick}
                id={`id_${post._id}`}
              >
                like
              </button>
            </div>
            <div>
              <button
                type="button"
                className="reaction-btn dislike-btn"
                onClick={handleDislikeClick}
                id={`id_${post._id}`}
              >
                dislike
              </button>
              <CommentSection addReaction={addReaction} post={post} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
