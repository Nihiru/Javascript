import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({ postId }) => {
  const [comments, setComments] = useState([]);
  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
  };
  // run code at specific point in time of a component
  useEffect(() => {
    fetchData();
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}> {comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
