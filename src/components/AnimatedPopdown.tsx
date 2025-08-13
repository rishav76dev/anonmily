import { cn } from "@/lib/utils";
import { AnimatedList } from "./ui/animated-list";
import { bricolage_grotesque } from "@/lib/fonts";

interface QuestionItem {
  question: string;
  askedFrom: string;
  icon: string;
  color: string;
  time: string;
}

const questions: QuestionItem[] = [
  {
    question: "What's one thing you'd tell your younger self?",
    askedFrom: "Anonymous",
    time: "2m ago",
    icon: "💭",
    color: "#1E86FF",
  },
  {
    question: "If money wasn't a concern, what would you be doing right now?",
    askedFrom: "Anonymous",
    time: "5m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    question: "What's a small daily habit that makes you happy?",
    askedFrom: "Anonymous",
    time: "8m ago",
    icon: "✨",
    color: "#FFB800",
  },
  {
    question: "What's your most unpopular opinion?",
    askedFrom: "Anonymous",
    time: "12m ago",
    icon: "🔥",
    color: "#FF3D71",
  },
  {
    question: "If you could live anywhere in the world, where would it be?",
    askedFrom: "Anonymous",
    time: "15m ago",
    icon: "🌍",
    color: "#8B5CF6",
  },
];

const NotificationCard = ({
  question,
  askedFrom,
  icon,
  color,
  time,
}: QuestionItem) => {
  return (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-[900px] border cursor-pointer overflow-hidden rounded-2xl p-4 transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white shadow-md border-gray-950/[.1] hover:bg-gray-50",
        "dark:bg-gray-900 dark:border-gray-50/[.1] dark:hover:bg-gray-800"
      )}
    >
      <div className="flex flex-row items-start gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className={`flex flex-col overflow-hidden ${bricolage_grotesque}`}>
          <figcaption className="flex flex-row items-center gap-2 text-lg font-medium">
            <span className="text-sm sm:text-base font-semibold">
              {askedFrom}
            </span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm sm:text-base font-normal">{question}</p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedPopdowm({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] max-sm:h-[560px] w-full flex-col p-6 overflow-hidden rounded-lg",
        className
      )}
    >
      <AnimatedList>
        {questions.map((item, idx) => (
          <NotificationCard {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
