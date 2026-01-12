import { cn } from "@/src/lib/utils/cn";

export const styles = {
  button: (className?: string) =>
    cn(
      "border border-[#d3d3d3] py-3 px-4 rounded-full outline-none flex items-center gap-4 hover:cursor-pointer transition-colors",
      className,
    ),
  iconWrapper: cn("w-5 aspect-square relative shrink-0"),
  image: cn("object-cover"),
  textWrapper: (
    imageSrc?: string,
    centerContent?: boolean,
    isLoading?: boolean,
  ) =>
    cn(
      "w-full",
      !imageSrc || centerContent ? "text-center" : "text-left",
      isLoading !== undefined ? "flex items-center gap-2 justify-center" : "",
    ),
};
