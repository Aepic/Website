const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    try {
      client.connect();
      client.db("admin").command({ ping: 1 });
      console.log("Successfully connected to aepic database."); 
      _db = client.db("aepic");
    } finally {
      client.close();
    }
  },
 
  getDb: function () {
    return _db;
  },
};