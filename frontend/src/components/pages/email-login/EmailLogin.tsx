"use client";

import { Button, Input, Subtitle, Title } from "@/src/components/features";
import { styles } from "./EmailLogin.styles";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "../../ui/spinner";
import { useLogin } from "./EmailLogin.utils";

export function EmailLogin() {
  const searchParams = useSearchParams();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showUnauthorizedDialog, setShowUnauthorizedDialog] =
    useState<boolean>(false);
  const { handleLogin, isLoading } = useLogin();

  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  return (
    <main className={styles.main()}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Title>Welcome back to Batch Break</Title>
          <Subtitle>
            You'll get access to internal workflows, finances and more
          </Subtitle>
        </div>

        <form
          className={styles.formGroup}
          onSubmit={(e) => {
            handleLogin({ e, emailRef, passwordRef }).then((res) => {
              setShowUnauthorizedDialog(!res);
            });
          }}
        >
          <Input
            placeholder="Email address"
            type="email"
            defaultValue={searchParams.get("email") || ""}
            ref={emailRef}
          />
          <Input
            placeholder="Password"
            autoComplete="new-password"
            type="password"
            ref={passwordRef}
          />

          {showUnauthorizedDialog && (
            <p className={styles.errorText}>Wrong email or password</p>
          )}

          <Button className={styles.submitButton}>
            <div className={styles.buttonContent}>
              {isLoading && <Spinner />}
              Log in
            </div>
          </Button>
        </form>

        <div className={styles.footer}>
          <a href="/" className={styles.footerLink}>
            Terms of Use
          </a>
          <div className={styles.footerDivider}></div>
          <a href="/" className={styles.footerLink}>
            Privacy Policy
          </a>
        </div>
      </div>
    </main>
  );
}
