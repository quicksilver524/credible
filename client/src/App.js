import "./App.css";
import Nav from "./components/Nav";
import PostCreate from './components/PostCreate'
import Post from './components/Post'

function App() {
  return (
    <div>
      <Nav id="nav-section" />
      <main id="main-section">
        <PostCreate />
        {/* <Post /> */}
      </main>
    </div>
  );
}

export default App;
