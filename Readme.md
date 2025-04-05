# CodeSphere: Real-Time Collaborative Coding and Chat Platform

## 🚀 Overview

**CodeSphere** is a real-time collaborative web application designed for developers, students, and teams to **collaborate on JavaScript code**, **chat in real-time**, and **track meeting sessions** seamlessly. The project uses modern technologies like **React.js**, **Node.js**, **Express.js**, **MongoDB**, and **Socket.io** to create an interactive and dynamic experience.

Users can create or join meetings using a unique meeting ID and collaborate with others via:

- A **live chat system**
- A **shared JavaScript code editor** with output display
- A **real-time participant tracking** system

---

## 🌟 Key Features

- 🔐 **Meeting Management**: Users can create and join meetings with unique IDs.
- 🧑‍💻 **Real-time Code Collaboration**: Shared code editor synced across all participants.
- 📤 **Live Code Execution**: Run JavaScript code and share output with other users.
- 💬 **Group Chat**: Real-time messaging system within the meeting.
- 👥 **Participants View**: See who is currently in the meeting.
- ⚡ **WebSocket-based Communication**: Ensures smooth real-time interaction.
- 🔒 **Environment Variable Config Support**: Backend URL and socket endpoints are configurable via `.env`.

---

## 📁 Project Structure

```
CodeSphere/
│
├── codesphere-frontend/    # React frontend
│   ├── src/components/         # Reusable UI components
│   ├── src/context/            # React Contexts (Meeting, Message, Code)
│   └── ...
│
├── codesphere-backend/     # Node.js backend
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   └── ...
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

1. Open the app in your browser: `http://localhost:3000`
2. Enter your name and create or join a meeting using a Meeting ID.
3. Use the chat panel to message other users in real time.
4. Write JavaScript code in the editor and click **Run** to execute and share results.
5. Watch as code, output, and messages sync live across all participants!

---

## 🛠️ Technologies Used

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time**: Socket.io
- **Others**: Axios, dotenv, ESLint

---

## 💡 Future Improvements

- 🧪 Add syntax highlighting with Monaco or CodeMirror
- 🔐 Add authentication and user profiles
- 📜 Add code version history
- 🎥 Integrate video/audio conferencing
- 🧑‍🏫 Instructor/host mode with admin controls

---

## 🙌 Credits

This project was created by [**Tushar Kesarwani**](https://github.com/TusharKesarwani) — Full Stack Developer & Competitive Programmer, as a collaborative coding and communication tool to boost productivity among teams.
