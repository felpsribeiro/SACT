const express = require("express");
const cors = require("cors");
const validate = require("express-validation");
const figlet = require("figlet");
require("dotenv").config();

class App {
  constructor() {
    this.PORT = (process.env.PORT || 8080);
    // initializing express
    this.express = express();
    this.express.use(express.json());
    this.express.use(cors());
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
    figlet.text(
      "SACT - Eng de Software",
      {
        font: "Standard",
        horizontalLayout: "fitted",
        verticalLayout: "fitted",
        width: 200,
        whitespaceBreak: true,
      },
      function(err, data) {
        if (err) {
          console.log("SACT - Eng de Software");
          return;
        }
        console.log(data);
        console.log("\n\n");
      }
    );
  }
}

module.exports = App;