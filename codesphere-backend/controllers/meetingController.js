const Meeting = require("../models/Meeting");
const { v4: uuidv4 } = require("uuid");

exports.createMeeting = async (req, res) => {
    try {
        const { myUUID, email, name, socketId } = req.body;
        if (!myUUID || !email || !name || !socketId) {
            return res.status(400).json({ error: "myUUID, email, name, and socketId are required." });
        }

        console.log("Creating a new meeting...");
        const meetingId = Math.random().toString(36).substring(2, 10);
        const newMeeting = new Meeting({
            meetingId,
            participants: [{
                uuid: myUUID,
                email,
                name,
                socketId,
            }],
            messages: [],
            createdAt: new Date()
        });
        await newMeeting.save();
        console.log(`Meeting created with ID: ${meetingId}`);

        res.status(200).json(newMeeting);
    } catch (err) {
        console.error("Error creating meeting:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getMeeting = async (req, res) => {
    try {
        const { myUUID, email, name, socketId } = req.body;
        const { meetingId } = req.params;

        if (!myUUID || !email || !name || !socketId || !meetingId) {
            return res.status(400).json({ error: "Email, name, socketId, and meetingId are required." });
        }

        console.log(`Retrieving meeting with ID: ${meetingId}`);
        const meeting = await Meeting.findOne({ meetingId: meetingId });
        if (!meeting) return res.status(404).json({ message: "Meeting Not Found" });
        console.log(`Meeting retrieved with ID: ${meetingId}`);

        meeting.participants.push({
            UUID: myUUID,
            email,
            name,
            socketId,
        });
        await meeting.save();

        res.status(200).json(meeting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getParticipants = async (req, res) => {
    try {
        const { meetingId } = req.params;
        if (!meetingId) return res.status(400).json({ message: "Meeting ID is required" });

        const meeting = await Meeting.findOne({ meetingId });
        if (!meeting) return res.status(404).json({ message: "Meeting not found" });

        res.status(200).json(meeting.participants);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}