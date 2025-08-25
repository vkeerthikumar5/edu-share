import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Conversations() {
  const { group_id:groupId } = useParams(); // ✅ get groupId from route
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  
  // Get token & user from localStorage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // {id, name, role}
  const userId=user?.id
  // ✅ Fetch messages
  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/${groupId}/messages`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // ✅ Send message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post(
        `http://localhost:5000/${groupId}/messages`,
        { text: newMessage,userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };
  console.log("groupId:", groupId);
  console.log("token:", token);
  console.log("user:", user);
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Group Chat</h2>

      {/* Messages box */}
      <div className="border rounded p-2 h-64 overflow-y-scroll mb-2 bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-2 p-2 rounded ${
              msg.sender._id === user.id
                ? "bg-blue-200 text-right"
                : "bg-green-200 text-left"
            }`}
          >
            <b>{msg.sender.name} ({msg.sender.role}):</b> {msg.text}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded p-2"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
