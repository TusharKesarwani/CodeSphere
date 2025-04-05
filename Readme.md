# CodeSphere: Real-Time Collaborative Coding and Chat Platform

## 🚀 Overview

**CodeSphere** is a full-stack, real-time collaborative web application designed for developers, students, and teams to:

- 👨‍💻 **Collaborate on JavaScript code**
- 💬 **Chat live with meeting participants**
- 🧑‍🤝‍🧑 **Track participant presence**
- 🧾 **Persist messages and meetings in MongoDB**

Built with modern technologies like **React**, **Node.js**, **Express**, **MongoDB**, and **Socket.io**, CodeSphere delivers a smooth, synced experience for remote coding and team discussions.

---

## 🌟 Key Features

- 🔐 **Meeting Creation & Joining**: Generate or enter a unique meeting ID to collaborate.
- 👥 **Real-Time Participant Tracking**: See who joins or leaves the session.
- 💬 **Persistent Group Chat**: All messages are stored and visible to every participant, even if they refresh.
- 💻 **Live Code Collaboration**: JavaScript editor with real-time sharing and output.
- ⚡ **Socket.io for Real-Time Sync**: Chat, code, and participants update instantly.
- 📁 **MongoDB Persistence**: Meetings and messages are saved securely in the database.
- 📦 **UUID-based Identification**: Unique participant IDs generated using UUIDv4.
- 🌐 **Environment Config Support**: Easy switching between dev and prod environments.

---

## 📁 Project Structure

```
CodeSphere/
│
├── codesphere-frontend/        # React.js app
│   ├── src/components/         # Chat UI, Code editor, etc.
│   ├── src/context/            # React Contexts for state sharing
│   └── ...
│
├── codesphere-backend/         # Express.js server
│   ├── models/Meeting.js       # Mongoose schema for meetings & messages
│   ├── controllers/            # Logic for handling APIs
│   ├── routes/                 # REST API endpoints
│   └── server.js               # Entry point with Socket.io integration
```

---

## 🔧 Installation

### 📦 Clone the Repository

```bash
git clone https://github.com/TusharKesarwani/codesphere.git
cd codesphere
```

---

## 🖥️ Backend Setup

1. Navigate to the backend directory:

```bash
cd codesphere-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=https://code-sphere-collab.vercel.app
```

4. Start the server:

```bash
npm start
```

The backend will run at: `http://localhost:5000`

---

## 🌐 Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../codesphere-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add the following:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

4. Start the frontend app:

```bash
npm start
```

The app will run at: `http://localhost:3000`

---

## 🧠 Usage

1. Open `http://localhost:3000` in your browser.
2. Enter your name, email, and join or create a meeting.
3. Collaborate on code in the editor.
4. Send and receive real-time messages (stored in the DB).
5. See when participants join or disconnect.
6. All messages are persisted and restored on reload.

---

## 🛠️ Technologies Used

- **Frontend**: React.js, HTML, CSS, JavaScript
- **State Management**: React Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Real-Time Communication**: Socket.io
- **Utilities**: Axios, dotenv, UUID

---

## 💡 Future Improvements

- 🎨 Syntax highlighting with **Monaco Editor**
- 🔐 Authentication & user sessions
- 🧠 AI-powered code assistance
- 📚 Code version control & history
- 🎥 Video/audio chat integration
- 🛑 Admin controls for host

---

## 🙌 Credits

This project was created by [**Tushar Kesarwani**](https://github.com/TusharKesarwani) — Full Stack Developer & Competitive Programmer, as a collaborative coding and communication tool to boost productivity among teams.
