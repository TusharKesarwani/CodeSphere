const Meeting = require("../models/Meeting");

exports.createMeeting = async (req, res) => {
    try {
        console.log("Creating a new meeting...");
        const meetingId = Math.random().toString(36).substring(2, 10);
        const newMeeting = new Meeting({
            meetingId, participants: [{
                email: req.body.email,
                name: req.body.name,
                socketId: req.body.socketId,
            }], createdAt: new Date()
        });
        await newMeeting.save();
        console.log("Request body:", req.body);
        console.log(`Meeting created with ID: ${meetingId}`);
        res.status(200).json({ meetingId });
    } catch (err) {
        console.error("Error creating meeting:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getMeeting = async (req, res) => {
    try {
        console.log(`Retrieving meeting with ID: ${req.params.meetingId}`);
        const meeting = await Meeting.findOne({ meetingId: req.params.meetingId });
        if (!meeting) return res.status(404).json({ message: "Meeting Not Found" });
        console.log(`Meeting retrieved with ID: ${req.params.meetingId}`);
        meeting.participants.push({
            email: req.body.email,
            name: req.body.name,
            socketId: req.body.socketId,
        });
        await meeting.save();
        res.status(200).json(meeting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSocketId = async (req, res) => {
    const { name, newSocketId } = req.body;

    try {
        const meeting = await Meeting.findOne({ meetingId: req.params.meetingId });
        if (!meeting) return res.status(404).json({ message: "Meeting not found" });

        meeting.participants = meeting.participants.map((participant) =>
            participant.name === name ? { ...participant, socketId: newSocketId } : participant
        );

        await meeting.save();
        res.status(200).json({ message: "Socket ID updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
