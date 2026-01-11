import { styles } from "./Subtitle.styles";

interface SubtitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function Subtitle({ children, className, ...rest }: SubtitleProps) {
  return (
    <h1 className={styles.subtitle(className)} {...rest}>
      {children}
    </h1>
  );
}
