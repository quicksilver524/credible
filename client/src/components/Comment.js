import React, { useState } from "react";

function CommentSection({addReaction, post}) {
  const [commentText, setCommentText] = useState("");
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
  );
}

export default CommentSection;