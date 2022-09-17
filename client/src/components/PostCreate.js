import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../../utils/queries";

const PostCreate = () => {
  const [postText, setText] = useState("");
  // const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, posts: [...me.posts, addPost] } },
        });
      } catch (e) {
        console.warn("First Post insertion by user!");
      }

      // update thought array's cache
      const { posts } = cache.readQuery({ query: QUERY_POSTS });
      cache.writeQuery({
        query: QUERY_POSTS,
        data: { posts: [addPost, ...posts] },
      });
    },
  });

  // update state based on form input changes
  const handleChange = (event) => {
    // if (event.target.value.length <= 280) {
    if (event.target.value) {
      setText(event.target.value);
      // setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPost({
        variables: { postText },
      });

      // clear form value
      setText("");
      // setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="card-container">
      <div id="post-create">
        <form onSubmit={handleFormSubmit}>
          <textarea
            placeholder="Post Text Here!"
            onChange={handleChange}
            value={postText}
            className="thought-text-input"
          ></textarea>
          <button type="submit" className="post-create-btn">
            <h2>Post</h2>
          </button>
        </form>
        {error && <div>Post failed</div>}
      </div>
    </div>
  );
};

export default PostCreate;
