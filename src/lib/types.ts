export type Question = {
  id: number;
  question: string;
  answer?: string;
  isAnswered: boolean;
  userId?: number;
  createdAt: string;
  isDisplay: boolean;
  answeredAt?: string;
};

export type User = {
  username: string;
  email?: string;
  bio?: string | null;
  image?: string | null;
  slug: string;
};
