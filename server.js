require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/databaseConnection");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const { logger, logEvents } = require("./middleware/logger");

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", require("./routes/index"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log("Connected to MongoDB");
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", err => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostName}`, "mongoErrLog.log");
});
