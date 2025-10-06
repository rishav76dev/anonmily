"use client";

import { QuestionCard } from "./QuestionCard";
import { useQuestions } from "@/hooks/useMessageQueries";

export default function QuestionContainer({ slug }: { slug: string }) {
  const { data: questions = [], isLoading, error } = useQuestions(slug);

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return <p className="text-red-500">Error: Failed to load questions</p>;

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
