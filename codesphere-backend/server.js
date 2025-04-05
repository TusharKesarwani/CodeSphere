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

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
        io.emit("participantDisconnected", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
