import { login, signup } from "@/src/api/services/auth/AuthService";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
  RefObject,
} from "react";

interface SignupFormData {
  e: FormEvent<HTMLFormElement>;
  emailRef: RefObject<HTMLInputElement | null>;
  passwordRef: RefObject<HTMLInputElement | null>;
  confirmPasswordRef?: RefObject<HTMLInputElement | null>;
  firstNameRef?: RefObject<HTMLInputElement | null>;
  lastNameRef?: RefObject<HTMLInputElement | null>;
}

interface HandleLoginProps extends SignupFormData {
  router: AppRouterInstance;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

async function handleSignupLogic(props: HandleLoginProps): Promise<boolean> {
  const {
    e,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    firstNameRef,
    lastNameRef,
    router,
    setIsLoading,
  } = props;

  e.preventDefault();
  setIsLoading(true);

  try {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef?.current?.value || "";
    const firstName = firstNameRef?.current?.value || "";
    const lastName = lastNameRef?.current?.value || "";

    const result = await signup(
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
    );

    if (result.response?.access_token) {
      router.push("/dashboard");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Signup Error:", error);
    return false;
  } finally {
    setIsLoading(false);
  }
}

export function useSignup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = (formData: SignupFormData) =>
    handleSignupLogic({
      ...formData,
      router,
      setIsLoading,
    });

  return {
    handleSignup,
    isLoading,
  };
}
