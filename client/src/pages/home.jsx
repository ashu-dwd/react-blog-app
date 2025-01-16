import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        console.log(response.data);
        setListOfPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      {listOfPosts.map((post, index) => (
        <div
          key={post.id}
          className="post"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          <div className="title">{post.title}</div>
          <div className="content">{post.content}</div>
          <div className="author">{post.userId}</div>
        </div>
      ))}
    </div>
  );
}

export default Home;
