"use client";

import { Info, Send } from "lucide-react";
import { useState } from "react";

export default function AnswerForm({ id }: { id: string }) {
  const [answer, setAnswer] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleAnswerSubmit = async () => {
    if (!answer.trim()) {
      alert("Please write an answer before submitting.");
      return;
    }

    try {
      const res = await fetch(`/api/message/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      });

      if (res.ok) {
        alert("Answer submitted successfully!");
        setAnswer("");
        setCharCount(0);
      } else {
        alert("Failed to submit answer.");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-black text-sm font-semibold">
        Send your response to the anonymous sender
      </div>
      <div className="relative">
        <textarea
          name="answer"
          placeholder="Reply with your thoughts..."
          maxLength={500}
          rows={4}
          onChange={(e) => {
            setAnswer(e.target.value);
            setCharCount(e.target.value.length);
          }}
          className="w-full bg-white text-black border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
        />
        <span className="absolute bottom-2 right-3 text-xs text-gray-600 select-none">
          {charCount}/500
        </span>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <Info size={14} />
          Visible publicly once answered.
        </div>
        <button
          onClick={handleAnswerSubmit}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
        >
          Send Reply
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
