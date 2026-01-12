import { styles } from "./FooterLinks.styles";

export function FooterLinks() {
  return (
    <div className={styles.footerLinks}>
      <a href="/" className={styles.footerLink}>
        Terms of Use
      </a>
      <div className={styles.footerSeparator} />
      <a href="/" className={styles.footerLink}>
        Privacy Policy
      </a>
    </div>
  );
}
