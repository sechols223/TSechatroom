const express = require('express');
const router = express.Router();
const { registration } = require('./auth');
router.route("/register").post(registration);
module.exports = router;