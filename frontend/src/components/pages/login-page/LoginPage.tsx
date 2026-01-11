"use client";

import { Button, Input, Subtitle, Title } from "@/src/components/features";
import { Separator } from "@/src/components/features/separator/Separator";
import { styles } from "./LoginPage.styles";
import { useLoginUtils } from "./LoginPage.utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function LoginPage() {
  const router = useRouter();
  const googleRef = useRef<HTMLButtonElement>(null);
  const githubRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const { handleLoginEmail, handleLoginGoogle, handleLoginGithub } =
    useLoginUtils({
      router,
      googleRef,
      githubRef,
      emailRef,
    });

    useEffect(()=>{
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
          <Input placeholder="Email address" type="email" ref={emailRef} />
          <Button className={styles.submitButton}>Continue</Button>
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
