const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile
} = require("../controllers/Auth.controller");

router.post("/login", loginUser);
router.post('/register', registerUser);
router.post('/current', getUserProfile);


module.exports = router;
