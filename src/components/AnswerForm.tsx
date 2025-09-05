"use client";

import { Info, Send } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import axios from "axios";

export default function AnswerForm({ id }: { id: string }) {
  const [answer, setAnswer] = useState("");
  const [charCount, setCharCount] = useState(0);
  const router = useRouter();

  const handleAnswerSubmit = async () => {
    if (!answer.trim()) {
      alert("Please write an answer before submitting.");
      return;
    }
      try {
        const res = await axios.put(`/api/messages/answer/${id}`, { answer });

        if (res.status === 200) {
          alert("Answer submitted successfully!");
          setAnswer("");
          setCharCount(0);
          router.refresh();
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

      <div className="text-sm font-semibold text-foreground">
        Send your response to the anonymous sender
      </div>

      <div className="relative">
        <Textarea
          name="answer"
          placeholder="Reply with your thoughts..."
          maxLength={500}
          rows={4}
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setCharCount(e.target.value.length);
          }}
          className="w-full bg-background text-foreground border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <span className="absolute bottom-2 right-3 text-xs text-muted-foreground select-none">
          {charCount}/500
        </span>
      </div>

      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Info size={14} />
          Visible publicly once answered.
        </div>
        <button
          onClick={handleAnswerSubmit}
          className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
        >
          Send Reply
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
