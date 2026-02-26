const { PORT, MONGODB_URI } = require("./utils/config");
const app = require("./app");
const logger = require("./utils/logger");

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
