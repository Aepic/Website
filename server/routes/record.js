const express = require("express");

const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// Get a list of all the posts.
recordRoutes.route("/post").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("post").find({}).toArray()
    .then(result => res.json(result))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Get a single post by id
recordRoutes.route("/post/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  
  db_connect.collection("post").findOne(myquery)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Create a new post.
recordRoutes.route("/post/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    user_id: req.body.user_id,
    prompt: req.body.prompt,
    image_url: req.body.image_url,
    timestamp_creation: req.body.timestamp_creation,
  };
  
  db_connect.collection("post").insertOne(myobj)
    .then(res => {
      response.json(res);
    })
    .catch(err => {
      console.error(err);
      response.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = recordRoutes;