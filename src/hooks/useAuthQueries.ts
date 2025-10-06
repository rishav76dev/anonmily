import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginCredentials {
  email: string;
  password: string;
}


export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Login failed");
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success("Logged in successfully!");
      // Invalidate and refetch auth state
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      // Redirect to user's profile
      if (data.user?.slug) {
        router.push(`/${data.user.slug}`);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Logged out successfully!");
      // Clear all cached data
      queryClient.clear();
      router.push("/");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

/**
 * Query to fetch current user profile details
 */
export function useUserProfile(slug: string) {
  return useQuery({
    queryKey: ["user", "profile", slug],
    queryFn: async () => {
      const res = await fetch(`/api/users/${slug}`);
      if (!res.ok) {
        throw new Error("Failed to fetch user profile");
      }
      return res.json();
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
