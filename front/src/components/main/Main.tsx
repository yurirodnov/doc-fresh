import { FileUploadForm } from "../file-upload-form/FileUploadForm";
import styles from "./Main.module.css";

export const Main = () => {
  return (
    <main className={styles.main}>
      <FileUploadForm />
    </main>
  );
};
