const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const postRoute = require("./routes/PostRoute");
const { ATLAS_URI, PORT } = process.env;

mongoose
  .connect(ATLAS_URI)
  .then(() => console.log("aepic database is connected successfully"))
  .catch((err) => console.error(err));

const dbo = require("./db/conn");
app.listen(PORT, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
    });
  console.log(`Server is running on port: ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute, postRoute);