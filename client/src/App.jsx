import "./app.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/createPost";
import Post from "./pages/Post";

export default function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/" className="link">
            Home Page
          </Link>
          <br />
          <Link to="CreatePost" className="link">
            Create A Post
          </Link>
        </nav>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}
