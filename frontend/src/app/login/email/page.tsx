import { EmailLogin } from "@/src/components/pages/email-login/EmailLogin";
import { Suspense } from "react";

export default function EmailLoginPage() {
  return (
    <Suspense fallback={null}>
      <EmailLogin />
    </Suspense>
  );
}
