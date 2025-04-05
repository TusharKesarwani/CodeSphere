const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

const meetingRoutes = require("./routes/meetingRoutes");
app.use("/api/meetings", meetingRoutes);

const messageRoutes = require("./routes/messageRoutes");
const Meeting = require("./models/Meeting");
app.use("/api/messages", messageRoutes);

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinMeeting", async ({ meetingId, name }) => {
        socket.join(meetingId);
        io.to(meetingId).emit("newParticipant", { name, socketId: socket.id });
        console.log(`Participant ${name} joined meeting ${meetingId}`);
    });

    socket.on("sendMessage", ({ meetingId, sender, text }) => {
        io.to(meetingId).emit("receiveMessage", { sender, text, timestamp: new Date() });
        console.log(`Message from ${sender} in meeting ${meetingId}: ${text}`);
    });

    socket.on("sendCode", ({ meetingId, sender, newCode, output }) => {
        io.to(meetingId).emit("receiveCode", newCode, output);
        console.log(`Code from ${sender} in meeting ${meetingId}: ${newCode} and Output: ${output}`);
    });

    socket.on("disconnect", async () => {
        console.log("Client disconnected", socket.id);
        // io.emit("participantDisconnected", socket.id);
        try {
            const meeting = await Meeting.findOne({ "participants.socketId": socket.id });
            if (!meeting) {
                console.log(`Meeting not found for socketId ${socket.id}`);
                return;
            }

            meeting.participants = meeting.participants.filter(p => p.socketId !== socket.id);
            await meeting.save();

            console.log(`Removed participant with socketId ${socket.id} from meeting ${meeting.meetingId}`);

            io.to(meeting.meetingId).emit("participantDisconnected", socket.id);
        } catch (err) {
            console.error("Error while removing participant on disconnect:", err);
        }

    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
