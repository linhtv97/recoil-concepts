import React from "react";
import "./App.css";
import Post from "./Post";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  postListState,
  selectedPostIdState,
  selectedPostState,
} from "./atoms/atoms";

function App() {
  const posts = useRecoilValue(postListState);

  const [selectedPost, setSelectedPost] = useRecoilState(selectedPostState({}));

  const setSelectedPostId = useSetRecoilState(selectedPostIdState);

  return (
    <div className="container">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Post
              key={post.id}
              post={post}
              setPostSelect={() => {
                setSelectedPostId(post.id);
              }}
            />
          </li>
        ))}
      </ul>
      {selectedPost && (
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={selectedPost.title}
            onChange={(e) => {
              setSelectedPost({
                ...selectedPost,
                title: e.target.value,
              });
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
