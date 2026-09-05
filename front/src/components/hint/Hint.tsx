import styles from "./Hint.module.css";

export const Hint = () => {
  return (
    <div className={styles.hintWrapper}>
      <span>?</span>
      <div className={styles.hints}>
        <p>- Max file size allowed - 5 MB</p>
        <p>- File format allowed - .txt, .pdf, .docx</p>
        <p>- Max links count in file allowed - 120</p>
      </div>
    </div>
  );
};
