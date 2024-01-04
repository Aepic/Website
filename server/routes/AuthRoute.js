const { Signup, Login } = require("../controllers/AuthController");
const { userVerification, getLoggedInUser } = require("../middleware/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login)
router.get("/current-user", userVerification, getLoggedInUser)

module.exports = router;