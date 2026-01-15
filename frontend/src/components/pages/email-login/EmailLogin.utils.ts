import { authService } from "@/src/api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
  RefObject,
} from "react";

interface LoginFormData {
  e: FormEvent<HTMLFormElement>;
  emailRef: RefObject<HTMLInputElement | null>;
  passwordRef: RefObject<HTMLInputElement | null>;
}

interface HandleLoginProps extends LoginFormData {
  router: AppRouterInstance;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

async function handleLoginLogic(props: HandleLoginProps): Promise<boolean> {
  const { e, emailRef, passwordRef, router, setIsLoading } = props;
  e.preventDefault();
  setIsLoading(true);
  try {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const result = await authService.login(email, password);
    if (result.response?.access_token) {
      router.push("/dashboard");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login Error:", error);
    return false;
  } finally {
    setIsLoading(false);
  }
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = (formData: LoginFormData) =>
    handleLoginLogic({
      ...formData,
      router,
      setIsLoading,
    });

  return {
    handleLogin,
    isLoading,
  };
}
