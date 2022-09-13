import "./App.css";
import Nav from "./components/Nav";
import PostCreate from './components/PostCreate'
import Post from './components/Post'
import Store from './components/Store'

function App() {
  return (
    <div>
      <Nav id="nav-section" />
      <main id="main-section">
        <PostCreate />
        <Post />
        <Store />
      </main>
    </div>
  );
}

export default App;
