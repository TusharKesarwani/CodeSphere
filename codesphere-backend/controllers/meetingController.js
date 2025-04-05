const Meeting = require("../models/Meeting");

exports.createMeeting = async (req, res) => {
    try {
        const { email, name, socketId } = req.body;
        if (!email || !name || !socketId) {
            return res.status(400).json({ error: "Email, name, and socketId are required." });
        }

        console.log("Creating a new meeting...");
        const meetingId = Math.random().toString(36).substring(2, 10);
        const newMeeting = new Meeting({
            meetingId, participants: [{
                email,
                name,
                socketId,
            }], createdAt: new Date()
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
        const { email, name, socketId } = req.body;
        const { meetingId } = req.params;

        if (!email || !name || !socketId || !meetingId) {
            return res.status(400).json({ error: "Email, name, socketId, and meetingId are required." });
        }

        console.log(`Retrieving meeting with ID: ${meetingId}`);
        const meeting = await Meeting.findOne({ meetingId: meetingId });
        if (!meeting) return res.status(404).json({ message: "Meeting Not Found" });
        console.log(`Meeting retrieved with ID: ${meetingId}`);

        meeting.participants.push({
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

exports.updateSocketId = async (req, res) => {
    const { email, name, newSocketId } = req.body;

    try {
        const meeting = await Meeting.findOne({ meetingId: req.params.meetingId });
        if (!meeting) return res.status(404).json({ message: "Meeting not found" });

        meeting.participants = meeting.participants.map((participant) =>
            participant.email === email && participant.name === name ? { ...participant, socketId: newSocketId } : participant
        );
        await meeting.save();

        res.status(200).json({ message: "Socket ID updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
