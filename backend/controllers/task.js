import { db } from "../db.js";

//Showing all Tasks
export const getTasks = (req, res) => {
  const q = req.query.prio
    ? "SELECT * FROM posts WHERE priority=?"
    : "SELECT * FROM tasks ORDER BY date ASC";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

//Showing single task

export const getTask = (req, res) => {
  const q =
    "SELECT tasks.id, `heading`, `description`,`date`,`image` FROM tasks WHERE tasks.id = ? ";
  //const q = "SELECT * FROM tasks WHERE tasks.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

//Adding new task
export const addTask = (req, res) => {
  const q =
    "INSERT INTO tasks(`heading`, `description`, `date`,`image`,`priority`) VALUES (?)";

  const values = [
    req.body.heading,
    req.body.description,
    req.body.date,
    req.body.image,
    req.body.prio,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Task has been created.");
  });
};

//Deleting existing task
export const deleteTask = (req, res) => {
  const taskId = req.params.id;
  const q = "DELETE FROM tasks WHERE `id` = ?";

  db.query(q, [taskId], (err, data) => {
    if (err) return res.status(403).json("Something is not done correctly!");
    return res.json("Task has been deleted!");
  });
};

//Updating exisiting task
export const updateTask = (req, res) => {
  const taskId = req.params.id;
  const q =
    "UPDATE tasks SET `heading`= ?,`description`= ?,`date`= ?,`image`= ?,`priority`=? WHERE `id` = ?";
  // var sql = "SET @learner_id = ?;SET @learner_name = ?;SET @learner_email = ?;SET @course_Id = ?;

  const values = [
    req.body.heading,
    req.body.description,
    req.body.date,
    req.body.image,
    req.body.prio,
  ];

  db.query(q, [...values, taskId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Task has been updated.");
  });
};
