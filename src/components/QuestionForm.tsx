"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSubmitQuestion } from "@/hooks/useMessageQueries";

export default function QuestionForm({ slug }: { slug: string }) {
  const [question, setQuestion] = useState("");
  const submitQuestionMutation = useSubmitQuestion();

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) return;

    submitQuestionMutation.mutate(
      { question: question.trim(), slug },
      {
        onSuccess: () => {
          setQuestion(""); // clear on success
        },
      }
    );
  };

  return (
    <form onSubmit={handleQuestionSubmit}>
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your message here..."
        required
      />
      <Button
        type="submit"
        className="mt-2"
        disabled={submitQuestionMutation.isPending}
      >
        {submitQuestionMutation.isPending ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}
