"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function QuestionForm({ slug }: { slug: string }) {
  const [question, setQuestion] = useState("");

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({ question, slug }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setQuestion(""); // clear on success
      alert("Question sent!");
    } else {
      alert("Something went wrong.");
    }
  };

  return (


 <form onSubmit={handleQuestionSubmit}>
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your message here..."
        required
      />
      <Button type="submit" className="mt-2">Send</Button>
    </form>

  );
}
