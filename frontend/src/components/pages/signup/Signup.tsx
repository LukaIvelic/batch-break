"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Input, Subtitle, Title } from "@/src/components/features";
import { useSignup } from "./signup-utils";
import { FooterLinks } from "../../features/footer-links/FooterLinks";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    refs.firstName.current?.focus();
  }, []);

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
    <main
      className={cn(
        `mx-auto max-w-[1400px] h-full flex justify-center items-center`,
      )}
    >
      <div
        className={cn(
          `w-[325px] h-fit flex flex-col justify-center gap-4 -translate-y-[50%]`,
        )}
      >
        <div className={cn(`text-center flex flex-col gap-2`)}>
          <Title>Sign up to Batch Break</Title>
          <Subtitle>
            You&apos;ll get access to internal workflows, finances and more
          </Subtitle>
        </div>

        <form
          className={cn(`flex flex-col gap-2`)}
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

          {error && (
            <p className={cn(`text-sm text-red-500 text-center pb-2`)}>
              {error}
            </p>
          )}

          <Button className={cn(`inverted`)} isLoading={isLoading}>
            Sign up
          </Button>
        </form>

        <FooterLinks />
      </div>
    </main>
  );
}
