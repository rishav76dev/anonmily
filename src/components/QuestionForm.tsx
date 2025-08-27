"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function QuestionForm({ slug }: { slug: string }) {
  const [question, setQuestion] = useState("");

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/messages", { question, slug });
      if (res.status >= 200 && res.status < 300) {
        setQuestion(""); // clear on success
        alert("Question sent!");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Something went wrong.");
      console.error(error);
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
