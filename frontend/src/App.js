import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (message.trim() && username.trim()) {
      socket.emit("send_message", {
        username,
        message
      });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Simple Chat</h2>

      <div>
        {chat.map((msg, index) => (
          <p key={index}>
            <strong>{msg.username}:</strong> {msg.message}
          </p>
        ))}
      </div>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;