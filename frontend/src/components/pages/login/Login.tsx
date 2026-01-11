"use client";

import { Button, Input, Subtitle, Title } from "@/src/components/features";
import { Separator } from "@/src/components/features/separator/Separator";
import { styles } from "./Login.styles";
import { useLoginUtils } from "./Login.utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Spinner } from "../../ui/spinner";

export function Login() {
  const router = useRouter();
  const googleRef = useRef<HTMLButtonElement>(null);
  const githubRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const { handleLoginEmail, handleLoginGoogle, handleLoginGithub, isLoading } =
    useLoginUtils({
      router,
      googleRef,
      githubRef,
      emailRef,
    });

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <main className={styles.main()}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Title>Log in or sign up</Title>
          <Subtitle>
            You'll get access to internal workflows, finances and more
          </Subtitle>
        </div>
        <div className={styles.authGroup}>
          <Button
            imageSrc="/images/google_logo.png"
            className={styles.socialButton}
            onClick={handleLoginGoogle}
            ref={googleRef}
          >
            Continue with Google
          </Button>
          <Button
            imageSrc="/images/github_logo.png"
            className={styles.socialButton}
            onClick={handleLoginGithub}
            ref={githubRef}
          >
            Continue with GitHub
          </Button>
        </div>
        <Separator />
        <form
          className={styles.formGroup}
          onSubmit={(e) => handleLoginEmail(e)}
        >
          <Input
            placeholder="Email address"
            type="email"
            ref={emailRef}
            autoComplete="email"
          />
          <Button className={styles.submitButton}>
            <div className={styles.buttonContent}>
              {isLoading && <Spinner />}
              Continue
            </div>
          </Button>
        </form>
        <div className="flex items-center justify-center gap-2 text-sm text-[#5e5e5e]">
          <a href="/" className="underline">
            Terms of Use
          </a>
          <div className="h-[14px] w-px bg-[#5e5e5e]/60"></div>
          <a href="/" className="underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </main>
  );
}
