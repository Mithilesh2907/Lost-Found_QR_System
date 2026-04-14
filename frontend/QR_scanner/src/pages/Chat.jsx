import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";

function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const clientRef = useRef(null); // 👈 FIX
    const chatId = "test123";

    useEffect(() => {
        const client = new Client({
            brokerURL: "ws://localhost:8080/ws",
            reconnectDelay: 5000,

            onConnect: () => {
                console.log("Connected");

                client.subscribe(`/topic/messages/${chatId}`, (msg) => {
                    const received = JSON.parse(msg.body);
                    setMessages((prev) => [...prev, received]);
                });
            },
        });

        client.activate();
        clientRef.current = client; // 👈 store it

        return () => {
            client.deactivate();
        };
    }, []);

    const sendMessage = () => {

        if (!message) return;

        if (!clientRef.current) {
            console.log("CLIENT NOT READY"); // 👈 debug
            return;
        }

        clientRef.current.publish({
            destination: `/app/chat.send/${chatId}`,
            body: JSON.stringify({
                chatId,
                senderId: "user1",
                text: message,
            }),
        });

        setMessage("");
    };

    return (
        <div>
            <h2>Chat</h2>

            <div style={{ border: "1px solid black", height: "200px", overflow: "auto" }}>
                {messages.map((msg, i) => (
                    <div key={i}>
                        <b>{msg.senderId}:</b> {msg.text}
                    </div>
                ))}
            </div>

            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;