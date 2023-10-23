import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({ prio }) => {
  const [tasks, settasks] = useState([]);
  console.log(prio);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/tasks/?prio=${prio}`);
        settasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [prio]);

  return (
    <div className="menu">
      <h1>Other {prio} priority tasks</h1>
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <img src={`../upload/${task?.image}`} alt="" />
          <h2>{task.heading}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
