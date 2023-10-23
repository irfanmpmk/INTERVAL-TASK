import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../components/Navbar";

const NewTask = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.heading || "");
  const [heading, setHeading] = useState(state?.description || "");
  const [file, setFile] = useState(null);
  const [prio, setPrio] = useState(state?.prio || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload/", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log(imgUrl);

    try {
      state
        ? await axios.put(`/tasks/${state.id}`, {
            heading,
            description: value,
            image: file ? imgUrl : "",
            prio,
          })
        : await axios.post(`/tasks/`, {
            heading,
            description: value,
            image: file ? imgUrl : "",
            prio,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <span className="NewTask">
          <Link className="link" to="/">
            Back to Home
          </Link>
        </span>
        <input
          type="text"
          value={heading}
          placeholder="Title"
          onChange={(e) => setHeading(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>

          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Priority</h1>
          <div className="prio">
            <input
              type="radio"
              checked={prio === "high"}
              name="prio"
              value="high"
              id="high"
              onChange={(e) => setPrio(e.target.value)}
            />
            <label htmlFor="high">High Priority</label>
          </div>
          <div className="prio">
            <input
              type="radio"
              checked={prio === "medium"}
              name="prio"
              value="medium"
              id="medium"
              onChange={(e) => setPrio(e.target.value)}
            />
            <label htmlFor="medium">Medium Priority</label>
          </div>
          <div className="prio">
            <input
              type="radio"
              checked={prio === "low"}
              name="prio"
              value="low"
              id="low"
              onChange={(e) => setPrio(e.target.value)}
            />
            <label htmlFor="low">Low Priority</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
