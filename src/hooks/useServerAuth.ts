import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/utils";

interface ServerAuthResult {
  user: { userId: number } | null;
  isAuthenticated: boolean;
}

export async function getServerAuth(): Promise<ServerAuthResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = getUserFromToken(token);

  return {
    user,
    isAuthenticated: !!user,
  };
}

/**
 * Utility function to check if a user owns a resource
 */
export function isOwner(
  authUser: { userId: number } | null,
  resourceUserId: number
): boolean {
  return authUser?.userId === resourceUserId;
}
