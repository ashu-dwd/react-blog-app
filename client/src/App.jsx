import "./app.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/createPost";
import Post from "./pages/Post";
import SignUpPage from "./pages/SignUp";
import Login from "./pages/Login";

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
          <br />
          <Link to="signup" className="link">
            SignUp Here
          </Link>
          <br />
          <Link to="login" className="link">
            Login
          </Link>
        </nav>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}
