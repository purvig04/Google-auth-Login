const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Home Page hello");
});

app.listen(3000, console.log("server is listening on port 3000"));
