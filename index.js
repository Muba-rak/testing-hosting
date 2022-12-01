const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Port =process.env.PORT || 5000;
const taskRouter = require("./routes/taskRouter");
const routeNotFound = require("./middleware/404");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/tasks", taskRouter);
app.use(routeNotFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(Port, () => {
      console.log("server connected");
    });
  })
  .catch((err) => console.log(err));
