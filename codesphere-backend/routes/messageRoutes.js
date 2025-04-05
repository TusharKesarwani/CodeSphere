const express = require("express");
const router = express.Router();
const { saveMessage, getMessages } = require("../controllers/messageController");

router.post("/save", saveMessage);
router.get("/:meetingId", getMessages);

module.exports = router;