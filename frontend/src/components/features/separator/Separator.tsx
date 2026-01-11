import { styles } from "./Separator.styles";

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return (
    <div className={styles.container(className)}>
      <hr className={styles.line} />
      <div className={styles.text}>OR</div>
      <hr className={styles.line} />
    </div>
  );
}
