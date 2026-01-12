import { useState, FormEvent, RefObject } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/src/api/services/auth/AuthService";
import { validateSignup } from "./validation";

interface SignupResponse {
  success: boolean;
  message: string;
}

const getRefValues = (
  refs: Record<string, RefObject<HTMLInputElement | null>>,
) =>
  Object.fromEntries(
    Object.entries(refs).map(([key, ref]) => [key, ref.current?.value || ""]),
  );

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (
    e: FormEvent,
    refs: Record<string, RefObject<HTMLInputElement | null>>,
  ): Promise<SignupResponse> => {
    e.preventDefault();
    setError(null);

    const data = getRefValues(refs);
    const validationError = validateSignup(data);

    if (validationError) {
      setError(validationError);
      return { success: false, message: validationError };
    }

    setIsLoading(true);
    try {
      const result = await signup(
        data.email,
        data.password,
        data.confirmPassword,
        data.firstName,
        data.lastName,
      );

      if (result.response?.access_token) {
        router.push("/dashboard");
        return { success: true, message: "Signup successful." };
      }

      const msg = "Signup failed. Please check your credentials.";
      setError(msg);
      return { success: false, message: msg };
    } catch {
      const msg = "An unexpected error occurred.";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignup, isLoading, error };
}
