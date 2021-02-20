const { Router } = require("express");

const { signIn, signUp, me } = require("../controllers/auth.controller");
const verifyToken = require("../middleware/verifyToken");

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/me", verifyToken, me);

module.exports = router;
