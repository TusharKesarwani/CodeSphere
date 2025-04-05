const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
    meetingId: { type: String, required: true, unique: true },
    participants: [{ email: String, name: String, socketId: String }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meeting", MeetingSchema);
