// components/UserProfile.tsx
import Image from "next/image";
type User = {
  username: string;
  image?: string | null;
  bio?: string | null;
};

export function UserInfo({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-4 mb-6 ">
        <p className="text-4xl mt-4 font-bold text-center mb-5">Welcome Back
          <span>  {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</span>
        </p>
    </div>
  );
}
