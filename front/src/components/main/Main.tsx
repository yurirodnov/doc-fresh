// front/src/components/main/Main.tsx

import { FileUploadForm } from "../file-upload-form/FileUploadForm";
import type { CheckResponse } from "../../types/types";
import styles from "./Main.module.css";
import { useState } from "react";

export const Main = () => {
  const [reportData, setReportData] = useState<CheckResponse | null>(null);

  return (
    <main className={styles.main}>
      <FileUploadForm onReportUpload={setReportData} />
    </main>
  );
};
