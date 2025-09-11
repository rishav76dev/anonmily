"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export default function QuestionForm({ slug }: { slug: string }) {
  const [question, setQuestion] = useState("");

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/messages", { question, slug });
      if (res.status >= 200 && res.status < 300) {
        setQuestion(""); // clear on success
        toast.success("Question sent successfully!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send question. Please try again.");
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
