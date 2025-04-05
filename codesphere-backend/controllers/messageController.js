const Meeting = require("../models/Meeting");

exports.saveMessage = async (req, res) => {
    try {
        const { myUUID, meetingId, sender, text, type = "message" } = req.body;

        if (!myUUID || !meetingId || !sender || !text) {
            return res.status(400).json({ error: "myUUID, meeting ID, sender, and text are required." });
        }

        const meeting = await Meeting.findOne({ meetingId });
        if (!meeting) {
            return res.status(404).json({ error: "Meeting not found." });
        }

        const message = {
            UUID: myUUID,
            sender,
            text,
            type,
            timestamp: new Date()
        };

        meeting.messages.push(message);
        await meeting.save();

        res.status(200).json({ message: "Message saved successfully", data: message });
    } catch (err) {
        console.error("Error saving message:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};