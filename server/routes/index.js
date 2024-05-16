const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

router.post("/login", indexController.login);
router.post("/register", indexController.register);
router.post("/logout", indexController.logout);

module.exports = router;
