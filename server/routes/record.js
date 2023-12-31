const express = require("express");
 
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
 
 
// Get a list of all the posts.
recordRoutes.route("/post").get(function (req, res) {
 let db_connect = dbo.getDb("aepic");
 db_connect
   .collection("posts")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// Get a single post by id
recordRoutes.route("/post/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("posts")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
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
 db_connect.collection("posts").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});

module.exports = recordRoutes;