const Tasks = require("../models/Tasks");
const asyncWrapper = require("../middleware/asyncWrapper");

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Tasks.find();
  res.status(200).json({ noOfTasks: tasks.length, data: tasks });
});
// create a task /tasks req.body
const createTask = asyncWrapper(async (req, res) => {
  const { title, description} = req.body;
  if (!title || !description) {
    return res.status(401).json({ msg: "please Provide necessary values" });
  }

  const task = await Tasks.create(req.body);
  res.status(201).json({ data: task });
});

//get a single /tasks/:taskId req.params
const getTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const task = await Tasks.findById({ _id: taskId });
  if (!task) {
    return res
      .status(404)
      .json({ msg: `The Task with the id  ${taskId} can not be found` });
  }
  res.status(200).json({ data: task });
});
// updating a task  /tasks/:taskId req.body
const updateTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, completed } = req.body;
  const userBody = req.body;
  // if (!title || !description || !completed) {}
  const updatedTask = await Tasks.findByIdAndUpdate({ _id: taskId }, userBody, {
    new: true,
    runValidators: true,
  });
  if (!updatedTask) {
    return res
      .status(404)
      .json({ msg: `Task with the id: ${taskId} not found` });
  }
  res.status(200).json({ msg: "Task Updated", data: updatedTask });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const taskId = req.params.taskId;
  const task = await Tasks.findByIdAndDelete({ _id: taskId });
  if (!task) {
    return res
      .status(404)
      .json({ msg: `Task with the id: ${taskId} not found` });
  }
  res.status(200).json({ msg: "Task has been deleted", deletedTask: task });
});

module.exports = { getTasks, createTask, getTask, deleteTask, updateTask };
