const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
} = require("../controller/taskController");


// router.get("/", getTasks);
// router.post("/", createTask);
// router.get("/:taskId", getTask);
// router.patch("/:taskId", updateTask);
// router.delete("/:taskId", deleteTask);

router.route("/").get(getTasks).post(createTask);
router.route("/:taskId").get(getTask).delete(deleteTask).patch(updateTask);

module.exports = router;
