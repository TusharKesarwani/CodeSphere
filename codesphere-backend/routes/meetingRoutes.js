const express = require("express");
const router = express.Router();
const { createMeeting, getMeeting, updateSocketId } = require("../controllers/meetingController");

router.post("/create", createMeeting);
router.post("/:meetingId", getMeeting);
router.put("/api/meetings/:meetingId/update-socket", updateSocketId);

module.exports = router;
