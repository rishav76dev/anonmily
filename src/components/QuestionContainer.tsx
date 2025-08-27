"use client";

import { useEffect, useState } from "react";
import { Question } from "@/lib/types";
import { QuestionCard } from "./QuestionCard";

export default function QuestionContainer({ slug }: { slug: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/messages/${slug}`);
        const data = await res.json();
        // console.log("Fetched questions:", data);
        setQuestions(data.message);
      } catch (err: unknown) {
        console.error("Fetch error:", err);
        const message =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>

      {questions.length === 0 ? (
        <p className="text-gray-500">No questions yet.</p>
      ) : (
        questions.map((q) => (
          <QuestionCard
            key={q.id}
            id={q.id.toString()}
            question={q.question}
            date={new Date(q.createdAt).toLocaleString()}
            answer={q.answer}
            answeredAt={
              q.answeredAt ? new Date(q.answeredAt).toLocaleString() : undefined
            }
          />
        ))
      )}
    </>
  );
}
