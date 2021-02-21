import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../store/Auth";
import { db } from "../../lib/firebase";

export const ChatInputBox: React.FC = () => {
  const { id } = useParams() as { id: string };

  const { data } = useAuth();
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("channels")
      .doc(id)
      .collection("messages")
      .add({
        user: db.collection("users").doc(data?.uid),
        text: input,
        created_at: new Date(),
      });
    setInput("");
  };

  return (
    <div className="ChatInputBox">
      <form onSubmit={handleSubmit}>
        <input
          className="ChatInput"
          placeholder="Message #general"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </form>
    </div>
  );
};
