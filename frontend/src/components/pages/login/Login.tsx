"use client";

import { Button, Input, Subtitle, Title } from "@/src/components/features";
import { Separator } from "@/src/components/features";
import { useLoginUtils } from "./Login.utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { FooterLinks } from "../../features/footer-links/FooterLinks";
import { cn } from "@/lib/utils";
import { AtSign } from "lucide-react";

export function Login() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const {
    handleSignup,
    handleLoginEmail,
    handleLoginGoogle,
    handleLoginGithub,
    isLoading,
  } = useLoginUtils({
    router,
    emailRef,
  });

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <main className={cn(`mx-auto max-w-350 h-full flex justify-center`)}>
      <div
        className={cn(
          `w-81.25 h-fit flex flex-col justify-center gap-4 translate-y-[calc(325px/2)]`,
        )}
      >
        <div className={cn(`text-center flex flex-col gap-2 pb-4`)}>
          <Title>Log in or sign up</Title>
          <Subtitle>
            You&apos;ll get access to internal workflows, finances and more
          </Subtitle>
        </div>
        <form
          className={cn(`flex flex-col gap-2`)}
          onSubmit={(e) => handleLoginEmail(e)}
        >
          <Input
            placeholder="Email address"
            type="email"
            ref={emailRef}
            autoComplete="email"
          />
          <Button className={cn(`inverted`)} isLoading={isLoading}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className={cn(`flex flex-col gap-2`)}>
          <Button
            imageSrc="/images/google_logo.png"
            className={cn(`hover:bg-foreground/10 hover:border-foreground/10`)}
            onClick={handleLoginGoogle}
          >
            Continue with Google
          </Button>
          <Button
            imageSrc="/images/github_logo.png"
            className={cn(`hover:bg-foreground/10 hover:border-foreground/10`)}
            onClick={handleLoginGithub}
          >
            Continue with GitHub
          </Button>
          <Button
            className={cn(`hover:bg-foreground/10 hover:border-foreground/10`)}
            onClick={handleSignup}
            icon={AtSign}
          >
            Continue to Sign up
          </Button>
        </div>
        <FooterLinks />
      </div>
    </main>
  );
}
