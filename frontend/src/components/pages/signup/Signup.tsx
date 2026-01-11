"use client";

import { Button, Input, Subtitle, Title } from "@/src/components/features";
import { styles } from "./Signup.styles";
import { useSearchParams } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { useSignup } from "./Signup.utils";
import { Spinner } from "../../ui/spinner";

export function Signup() {
  const searchParams = useSearchParams();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { isLoading, handleSignup } = useSignup();
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSignup({
      e,
      emailRef,
      passwordRef,
      confirmPasswordRef,
      firstNameRef,
      lastNameRef,
    }).then((res) => {
      setShowErrorDialog(!res);
    });
  };

  return (
    <main className={styles.main()}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Title>Sign up to Batch Break</Title>
          <Subtitle>
            You'll get access to internal workflows, finances and more
          </Subtitle>
        </div>
        <form
          className={styles.formGroup}
          onSubmit={(e) => {
            handleSignUp(e);
          }}
        >
          <Input
            placeholder="First Name"
            type="text"
            ref={firstNameRef}
            required
          />
          <Input
            placeholder="Last Name"
            type="text"
            ref={lastNameRef}
            required
          />
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
            required
          />
          <Input
            placeholder="Confirm Password"
            autoComplete="new-password"
            type="password"
            ref={confirmPasswordRef}
            required
          />

          {showErrorDialog && (
            <p className={styles.errorText}>Sign up failed</p>
          )}

          <Button className={styles.submitButton}>
            <div className={styles.buttonContent}>
              {isLoading && <Spinner />}
              Sign up
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
