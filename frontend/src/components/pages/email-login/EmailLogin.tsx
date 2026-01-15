"use client";

import { Button, Input, Subtitle, Title } from "@/src/components/features";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLogin } from "./EmailLogin.utils";
import { cn } from "@/lib/utils";

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
    <main className={cn(`mx-auto max-w-[1400px] h-full flex justify-center`)}>
      <div
        className={cn(
          `w-[325px] h-fit flex flex-col justify-center gap-4 translate-y-[calc(325px/2)]`,
        )}
      >
        <div className={cn(`text-center flex flex-col gap-2`)}>
          <Title>Welcome back to Batch Break</Title>
          <Subtitle>
            You&apos;ll get access to internal workflows, finances and more
          </Subtitle>
        </div>

        <form
          className={cn(`flex flex-col gap-2`)}
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
            <p className={cn(`text-sm text-red-500 text-center pb-2`)}>
              Incorrect email or password
            </p>
          )}

          <Button className={cn(`inverted`)} isLoading={isLoading}>
            Log in
          </Button>
        </form>

        <div
          className={cn(
            `flex items-center justify-center gap-2 text-sm text-[#5e5e5e]`,
          )}
        >
          <a href="/" className={cn(`underline`)}>
            Terms of Use
          </a>
          <div className={cn(`h-[14px] w-px bg-[#5e5e5e]/60`)}></div>
          <a href="/" className={cn(`underline`)}>
            Privacy Policy
          </a>
        </div>
      </div>
    </main>
  );
}
