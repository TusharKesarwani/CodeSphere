const express = require("express");
const router = express.Router();
const { createMeeting, getMeeting } = require("../controllers/meetingController");

router.post("/create", createMeeting);
router.post("/:meetingId", getMeeting);

module.exports = router;
