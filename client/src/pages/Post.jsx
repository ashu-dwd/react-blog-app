import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/posts/${id}`),
          axios.get(`http://localhost:3000/comments/${id}`),
        ]);
        setPost(postResponse.data);
        setComments(commentsResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const handlePostComment = () => {
    if (!commentBody.trim()) return; // Prevent empty comments
    const username = "Anonymous"; // Set the username here
    const comment = { CommentBody: commentBody, username, postId: id };
    axios
      .post(`http://localhost:3000/comments/`, comment)
      .then((response) => {
        setComments([...comments, response.data]);
        setCommentBody(""); // Clear textarea after posting
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) {
    return <div className="loading-icon">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <div className="post-container">
        <h1 className="post-heading">{post.title}</h1>
        <p className="post-content">{post.content}</p>
        <p className="post-author">By: {post.username}</p>
      </div>
      <div className="comment-section">
        <h2 className="comment-heading">Comments</h2>
        <div className="comments">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p className="comment-body">{comment.CommentBody}</p>
                <p className="comment-author">By: {comment.username}</p>
              </div>
            ))
          ) : (
            <p>No comments available</p>
          )}
        </div>
        <div className="comment-box">
          <textarea
            className="comment-textarea"
            placeholder="Write your comment here..."
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)} // Update state
            autoComplete="off"
          ></textarea>
          <button className="comment-button" onClick={handlePostComment}>
            Post Comment
          </button>
        </div>
      </div>
    </>
  );
}

export default Post;
