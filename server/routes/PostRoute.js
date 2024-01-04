const { getPosts, createPost } = require("../controllers/PostController");
const { userVerification } = require("../middleware/AuthMiddleware");
const router = require("express").Router();

router.get("/posts", getPosts);
router.post("/posts", userVerification, createPost);

module.exports = router;