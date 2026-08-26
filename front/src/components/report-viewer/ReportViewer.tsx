// front//src/components/report-viewer/ReportViewer.tsx

import type { LinkCheckReport } from "../../types/types";
import styles from "./ReportViewer.module.css";

interface ReportViewerProps {
  report: LinkCheckReport | null;
}

export const ReportViewer = ({ report }: ReportViewerProps) => {
  return (
    <div className={styles.report}>
      <h3>Check report</h3>
      <div className={styles.reportMetric}>
        <span>Links checked:</span>
        <span>{report ? report.linksTotalCount : "N/A"}</span>
      </div>
      <div className={styles.reportMetric}>
        <span>Success:</span>
        <span>{report ? report.linksSuccessCount : "N/A"}</span>
      </div>
      <div className={styles.reportMetric}>
        <span>Fail:</span>
        <span>{report ? report.linksFailCount : "N/A"}</span>
      </div>
    </div>
  );
};
