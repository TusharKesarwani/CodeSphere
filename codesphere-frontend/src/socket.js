import { io } from "socket.io-client";
const socket = io(process.env.REACT_APP_BACKEND_URL);
socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
    localStorage.setItem("socketId", socket.id);
});
export default socket;
