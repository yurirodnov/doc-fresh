import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Docfresh</span>
    </header>
  );
};
