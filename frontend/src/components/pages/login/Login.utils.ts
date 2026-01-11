import { isInDatabase } from "@/src/api/services/users/UsersService";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormEvent, useState } from "react";

const handleLoginEmail = async (
  event: FormEvent<HTMLFormElement>,
  setIsLoading: (loading: boolean) => void,
  router?: AppRouterInstance,
  emailRef?: React.RefObject<HTMLInputElement | null>,
) => {
  event.preventDefault();

  const email = emailRef?.current?.value;

  if (!email || !router) {
    emailRef?.current?.classList.add("!border-red-500");
    emailRef?.current?.focus();
    return;
  }

  try {
    setIsLoading(true);
    const isInDb = await isInDatabase(email);
    const target = isInDb ? "/login/email" : "/signup";
    router.push(`${target}?email=${encodeURIComponent(email)}`);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

const handleLoginGoogle = (
  router?: AppRouterInstance,
  googleRef?: React.RefObject<HTMLButtonElement | null>,
) => {
  // Implement login logic here
};

const handleLoginGithub = (
  router?: AppRouterInstance,
  githubRef?: React.RefObject<HTMLButtonElement | null>,
) => {
  // Implement login logic here
};

interface useLoginUtilsProps {
  router?: AppRouterInstance;
  googleRef?: React.RefObject<HTMLButtonElement | null>;
  githubRef?: React.RefObject<HTMLButtonElement | null>;
  emailRef?: React.RefObject<HTMLInputElement | null>;
}

const useLoginUtils = ({
  router,
  googleRef,
  githubRef,
  emailRef,
}: useLoginUtilsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    handleLoginEmail: (e: FormEvent<HTMLFormElement>) =>
      handleLoginEmail(e, setIsLoading, router, emailRef),
    handleLoginGoogle: () => handleLoginGoogle(router, googleRef),
    handleLoginGithub: () => handleLoginGithub(router, githubRef),
  };
};

export { useLoginUtils };
