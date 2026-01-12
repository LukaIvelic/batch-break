"use client";

import { Button, Input, Subtitle, Title } from "@/src/components/features";
import { Separator } from "@/src/components/features/separator/Separator";
import { styles } from "./Login.styles";
import { useLoginUtils } from "./Login.utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { FooterLinks } from "../../features/footer-links/FooterLinks";

export function Login() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const { handleLoginEmail, handleLoginGoogle, handleLoginGithub, isLoading } =
    useLoginUtils({
      router,
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
            You&apos;ll get access to internal workflows, finances and more
          </Subtitle>
        </div>
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
          <Button className={styles.submitButton} isLoading={isLoading}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className={styles.authGroup}>
          <Button
            imageSrc="/images/google_logo.png"
            className={styles.socialButton}
            onClick={handleLoginGoogle}
          >
            Continue with Google
          </Button>
          <Button
            imageSrc="/images/github_logo.png"
            className={styles.socialButton}
            onClick={handleLoginGithub}
          >
            Continue with GitHub
          </Button>
        </div>
        <FooterLinks />
      </div>
    </main>
  );
}
