const express = require("express");
const fs = require('fs');
const path = require('path');
const validate = require("express-validation");

class App {
  constructor() {
    this.PORT = 8080;
    this.logFile = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' });
    // initializing express
    this.express = express();
    // serving routes
    this.routes();
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }
      return res
        .status(500)
        .json({ error: "Internal Server error" });
    });
  }

  routes() {
    this.express.use(require("./routes"));
  }

  start() {
    this.express.listen(this.PORT);
    console.log("Listening to port", this.PORT);
  }
}

module.exports = App;