import { styles } from "./Title.styles";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function Title({ children, className, ...rest }: TitleProps) {
  return (
    <h1 className={styles.title(className)} {...rest}>
      {children}
    </h1>
  );
}
