import { cn } from "@/src/lib/utils/cn";

export const styles = {
  button: (className?: string) =>
    cn(
      "border border-[#5e5e5e] py-2 px-4 rounded-full outline-none flex items-center gap-4 hover:cursor-pointer transition-colors",
      className,
    ),
  iconWrapper: cn("w-5 aspect-square relative shrink-0"),
  image: cn("object-cover"),
  textWrapper: (imageSrc?: string, centerContent?: boolean) =>
    cn("w-full", !imageSrc || centerContent ? "text-center" : "text-left"),
};
