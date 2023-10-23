import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Radio } from "antd";
import Navbar from "../components/Navbar";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [radio, setRadio] = useState([]);

  const priority = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/tasks${priority}`);
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [priority]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="all">
      <Navbar />
      <div className="home">
        <div className="tasks">
          {tasks.map((task) => (
            <div className="task" key={task.id}>
              <div className="img">
                <img src={`../upload/${task.image}`} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/task/${task.id}`}>
                  <h1>{task.heading}</h1>
                </Link>
                <div className="prio">
                  <h3>Priority : {task.priority}</h3>
                </div>
                <div className="info">
                  <p>
                    <i>Posted {moment(task.date).fromNow()}</i>
                  </p>
                </div>
                <p>{getText(task.description)}</p>
                <Link className="link" to={`/task/${task.id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
