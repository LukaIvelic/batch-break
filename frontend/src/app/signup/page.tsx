import { SignupPage } from "@/src/components/pages";
import { Suspense } from "react";

export default function Signup() {
  return (
    <Suspense fallback={null}>
      <SignupPage />
    </Suspense>
  );
}
