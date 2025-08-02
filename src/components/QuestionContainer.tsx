"use client";

import { useEffect, useState } from "react";
import { Question } from "@/lib/types";
import { QuestionCard } from "./QuestionCard";

export default function QuestionContainer({ slug }: { slug: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);

  async function fetchData() {
  try {
    const result = await fetch(`/api/messages/${slug}`);
    const data = await result.json();
    console.log("Fetched questions:", data);
    setQuestions(data.message);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}


  useEffect(() => {
    fetchData();
  }, [slug]);

  return (
   <>
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q.question}
          date={new Date(q.createdAt).toLocaleString()}
        />
      ))}
    </>
);

}
