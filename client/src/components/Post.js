import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import {
  LIKE_THOUGHT,
  DISLIKE_THOUGHT,
  ADD_REACTION,
} from "../utils/mutations";

function Post() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.thoughts || [];
  const likeCount = data?.likeCount || 0;
  const [likeThought, { likeError }] = useMutation(LIKE_THOUGHT);
  const [dislikeThought, { dislikeError }] = useMutation(DISLIKE_THOUGHT);
  const [addReaction, { reactionError }] = useMutation(ADD_REACTION);
  const [commentText, setCommentText] = useState("");

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

  const handleCommentSubmit = async (e) => {
    try {
      console.log(e.target.id);
      await addReaction({
        variables: {
          thoughtId: e.target.id.substring(3),
          reactionBody: commentText,
        },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentFormChange = async (e) => {
    setCommentText(e.target.value);
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
            </div>
          </div>
          <div className="comment-container">
            {post.reactions.map((comment) => (
              <div key={comment._id} className="comment-card">
                <h4>{comment.username}</h4>
                <p>{comment.reactionBody}</p>
              </div>
            ))}
            <div className="comment-create-container">
              <textarea
                placeholder="comment goes here!"
                value={commentText}
                className="form-input thought-text-input"
                onChange={handleCommentFormChange}
              ></textarea>
              <button
                type="button"
                className="like-btn comment-btn"
                onClick={handleCommentSubmit}
                id={`id_${post._id}`}
              >
                comment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
