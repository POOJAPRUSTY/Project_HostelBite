const express = require("express");
const User = require("../models/User");
const router = express.Router();

const { login, signup } = require("../controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/Auth");

router.post("/login", login);
router.post("/signup", signup);

// testing protected routes for single middleware(auth is single middleware)
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for test"
    })
})

// protected route ---> ye route only student can see 
// dusra route admin dekh skta h not student

router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected path of student"
    });
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected path of admin"
    });

})
module.exports = router;