const express = require("express");
const app = express();

const authRoutes = require("./controllers/authRoutes");

app.use("/", authRoutes);



app.listen(3000, console.log("server is listening on port 3000"));
