"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Input, Subtitle, Title } from "@/src/components/features";
import { useSignup } from "./signup-utils";
import { styles } from "./Signup.styles";
import { FooterLinks } from "../../features/footer-links/FooterLinks";

export function Signup() {
  const searchParams = useSearchParams();
  const { handleSignup, isLoading, error } = useSignup();

  const refs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
  };

  const fields = [
    { name: "firstName", placeholder: "First Name", type: "text" },
    { name: "lastName", placeholder: "Last Name", type: "text" },
    {
      name: "email",
      placeholder: "Email address",
      type: "email",
      defaultValue: searchParams.get("email") || "",
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      auto: "new-password",
    },
    {
      name: "confirmPassword",
      placeholder: "Confirm Password",
      type: "password",
      auto: "new-password",
    },
  ];

  return (
    <main className={styles.main()}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Title>Sign up to Batch Break</Title>
          <Subtitle>
            You&apos;ll get access to internal workflows, finances and more
          </Subtitle>
        </div>

        <form
          className={styles.formGroup}
          onSubmit={(e) => handleSignup(e, refs)}
        >
          {fields.map((f) => (
            <Input
              key={f.name}
              ref={refs[f.name as keyof typeof refs]}
              placeholder={f.placeholder}
              type={f.type}
              defaultValue={f.defaultValue}
              autoComplete={f.auto}
              required
            />
          ))}

          {error && <p className={styles.errorText}>{error}</p>}

          <Button className={styles.submitButton} isLoading={isLoading}>
            Sign up
          </Button>
        </form>

        <FooterLinks />
      </div>
    </main>
  );
}
