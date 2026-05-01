"use client"
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
  setLoading(true);
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "my-app": "chat",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([...messages, `You: ${input}`, `AI: ${data.answer}`]);
    setInput("");
    setLoading(false);
  };

  return (
      <div>
        <h1>Chat</h1>
        <input
            className="border"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Type your message..."}
        />
        <button onClick={send}>Send</button>

        {messages.map((m, i) => (
            <div key={i}>{m}</div>
        ))}


        {loading && <div>Thinking...</div>}
      </div>
  );
}
