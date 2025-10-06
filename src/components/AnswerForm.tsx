"use client";

import { Info, Send } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { useSubmitAnswer } from "@/hooks/useMessageQueries";

export default function AnswerForm({ id }: { id: string }) {
  const [answer, setAnswer] = useState("");
  const [charCount, setCharCount] = useState(0);
  const router = useRouter();
  const submitAnswerMutation = useSubmitAnswer();

  const handleAnswerSubmit = async () => {
    if (!answer.trim()) {
      return;
    }

    submitAnswerMutation.mutate(
      { id, answer: answer.trim() },
      {
        onSuccess: () => {
          setAnswer("");
          setCharCount(0);
          router.refresh();
        },
      }
    );
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
          disabled={submitAnswerMutation.isPending || !answer.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitAnswerMutation.isPending ? "Sending..." : "Send Reply"}
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
