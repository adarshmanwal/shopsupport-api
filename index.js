const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const port = process.env.PORT || 3000;
const config = require("./config/config.js");
const routes = require("./routes");
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
// Test the database connection
const sequelize = new Sequelize(config.development);
sequelize
  .authenticate()
  .then(() => console.log("Database connected."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// app.use(userRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
