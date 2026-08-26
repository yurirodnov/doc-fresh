// front/src/components/main/Main.tsx

import { FileUploadForm } from "../file-upload-form/FileUploadForm";
import type { LinkCheckReport } from "../../types/types";
import styles from "./Main.module.css";
import { useState } from "react";
import { ReportViewer } from "../report-viewer/ReportViewer";

export const Main = () => {
  const [reportData, setReportData] = useState<LinkCheckReport | null>(null);

  return (
    <main className={styles.main}>
      <FileUploadForm onReportUpload={setReportData} />
      {reportData ? <ReportViewer report={reportData} /> : <div className={styles.noResults}>No results yet...</div>}
    </main>
  );
};
