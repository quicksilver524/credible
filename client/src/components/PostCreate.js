import React from "react";

function PostCreate() {
  return (
    <div id="card-container">
      <div id="post-create">
        <textarea placeholder="Post Text Here!"></textarea>
        <button type="submit" id="post-create-btn">
          <h2>Post</h2>
        </button>
      </div>
    </div>
  );
}

export default PostCreate;
