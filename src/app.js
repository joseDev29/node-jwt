const express = require("express");

const app = express();
const config = require("./config");

app.set("port", config.server.por || 7000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("Hello user");
});

app.use(require("./routes"));

module.exports = app;
