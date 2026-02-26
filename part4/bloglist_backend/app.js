const { MONGODB_URI } = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");
const blogRouter = require("./controllers/blog");

const app = express();
mongoose.set("strictQuery", false);

logger.info(`connecting to ${MONGODB_URI}`);
mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info("connected to MongoDB"))
  .catch((error) =>
    logger.error(`error conecting to MongoDB: ${error.message}`),
  );

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/blogs", blogRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
