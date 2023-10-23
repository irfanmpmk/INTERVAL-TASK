import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import SingleTask from "./pages/SingleTask";
import "./style.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<SingleTask />} />
          <Route path="/NewTask" element={<NewTask />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
