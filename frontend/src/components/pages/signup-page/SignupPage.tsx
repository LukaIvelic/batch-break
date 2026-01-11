"use client";

import { Button, Input, Subtitle, Title } from "@/src/components/features";
import { styles } from "./SignupPage.styles";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef } from "react";

export function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    //router.push("/dashboard");
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
          <Input placeholder="First Name" type="text" ref={firstNameRef} />
          <Input placeholder="Last Name" type="text" ref={lastNameRef} />
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
          <Input
            placeholder="Confirm Password"
            autoComplete="new-password"
            type="password"
            ref={confirmPasswordRef}
          />
          <Button className={styles.submitButton}>Sign up</Button>
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
