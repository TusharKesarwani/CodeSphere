import { io } from "socket.io-client";
const socket = io(process.env.REACT_APP_BACKEND_URL);
socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
    localStorage.setItem("socketId", socket.id);
});
socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    localStorage.removeItem("socketId");
});
socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
});
socket.on("connect_timeout", () => {
    console.error("Socket connection timeout");
});
socket.on("error", (err) => {
    console.error("Socket error:", err.message);
});
export default socket;
