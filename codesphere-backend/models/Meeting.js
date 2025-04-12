const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
    meetingId: { type: String, required: true, unique: true },
    users: [{ UUID: String, email: String, name: String, socketId: String }],
    participants: [{ UUID: String, email: String, name: String, socketId: String }],
    messages: [
        {
            UUID: { type: String, required: true },
            sender: { type: String, required: true },
            text: { type: String, required: true },
            type: { type: String, enum: ["message", "notification"], default: "message" },
            timestamp: { type: Date, default: Date.now },
        },
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meeting", MeetingSchema);
