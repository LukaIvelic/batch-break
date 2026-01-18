import { usersService } from "@/src/api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormEvent, useState } from "react";

interface UseLoginUtilsProps {
  router?: AppRouterInstance;
  googleRef?: React.RefObject<HTMLButtonElement | null>;
  githubRef?: React.RefObject<HTMLButtonElement | null>;
  emailRef?: React.RefObject<HTMLInputElement | null>;
}

const markInvalid = (ref?: React.RefObject<HTMLElement | null>) => {
  ref?.current?.classList.add("!border-red-500");
  ref?.current?.focus();
};

export const useLoginUtils = ({
  router,
  googleRef,
  githubRef,
  emailRef,
}: UseLoginUtilsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!router) return;

    const email = emailRef?.current?.value;
    if (!email) {
      markInvalid(emailRef);
      return;
    }

    try {
      setIsLoading(true);
      const exists = await usersService.exists(email);
      const target = exists ? "/login/email" : "/signup";
      router.push(`${target}?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!router) return;

    try {
      setIsLoading(true);
      router.push("/signup");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginGoogle = () => {
    // OAuth logic here
  };

  const handleLoginGithub = () => {
    // OAuth logic here
  };

  return {
    isLoading,
    handleLoginEmail,
    handleSignup,
    handleLoginGoogle,
    handleLoginGithub,
  };
};
