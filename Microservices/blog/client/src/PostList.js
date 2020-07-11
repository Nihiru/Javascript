import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonCreate from "./CommentCreate";
import CommonList from "./CommentList";
export default () => {
  const [posts, setPosts] = useState({});
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    console.log("Inside fetchPosts res: ", res);
    setPosts(res.data);
  };
  // run code at specific point in time of a component
  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommonList postId={post.id} />
          <CommonCreate postId={post.id} />
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
