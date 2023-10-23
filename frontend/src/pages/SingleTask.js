import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const SingleTask = () => {
  const [task, setTask] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const taskId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/tasks/${taskId}`);
        setTask(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [taskId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="singleTask">
      <span className="NewTask">
        <Link className="link" to="/">
          <h4>Back to Home</h4>
        </Link>
      </span>
      <div className="content">
        <img src={`../upload/${task?.image}`} alt="" />
        <div className="user">
          <div className="info">
            <p>Posted {moment(task.date).fromNow()}</p>
          </div>
          <div className="edit">
            <Link to={`/NewTask?edit=2`} state={task}>
              <EditNoteIcon fontSize="medium" />
            </Link>
            <DeleteIcon
              fontSize="medium"
              onClick={handleDelete}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <h1>{task.heading}</h1>
        <br />
        <h4>Priority : {task.priority}</h4>
        {console.log(task)}
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(task.description),
          }}
        ></p>{" "}
      </div>
      <Menu prio={task.priority} />
    </div>
  );
};

export default SingleTask;
