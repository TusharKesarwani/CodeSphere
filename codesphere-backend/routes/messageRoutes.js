const express = require("express");
const router = express.Router();
const { saveMessage } = require("../controllers/messageController");

router.post("/save", saveMessage);

module.exports = router;