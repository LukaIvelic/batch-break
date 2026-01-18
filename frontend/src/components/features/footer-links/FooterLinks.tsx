export function FooterLinks() {
  return (
    <div
      className={
        "flex items-center justify-center gap-2 text-sm text-[#5e5e5e] mt-6"
      }
    >
      <a href="/" className={"underline hover:text-black transition-colors"}>
        Terms of Use
      </a>
      <div className={"h-[14px] w-px bg-[#5e5e5e]/60"} />
      <a href="/" className={"underline hover:text- transition-colors"}>
        Privacy Policy
      </a>
    </div>
  );
}
