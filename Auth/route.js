const express = require('express');
const router = express.Router();
const { registration, login, update, deleteUser } = require('./auth');
const {adminAuth} = require('../middleware/auth');

router.route("/register").post(registration);
router.route("/update").put(update);
router.route("/deleteUser").delete(deleteUser);

module.exports = router;