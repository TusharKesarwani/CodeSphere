const express = require("express");
const router = express.Router();
const { createMeeting, getMeeting, getParticipants } = require("../controllers/meetingController");

router.post("/create", createMeeting);
router.post("/:meetingId", getMeeting);
router.get("/:meetingId/participants", getParticipants);

module.exports = router;
