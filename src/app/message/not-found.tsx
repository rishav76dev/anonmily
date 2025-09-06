import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">
        This page is not accessible to visitors
      </h1>

      <p className="text-gray-600 mt-2">
        If you are a creator,{" "}
        <Link
          href="/auth/login"
          className="text-blue-600 hover:underline font-medium"
        >
          log in
        </Link>{" "}
        or{" "}
        <Link
          href="/auth/register"
          className="text-blue-600 hover:underline font-medium"
        >
          sign up
        </Link>{" "}
        to become one.
      </p>
    </div>
  );
}
