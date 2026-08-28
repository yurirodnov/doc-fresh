// front//src/components/report-viewer/ReportViewer.tsx

import { useState } from "react";
import type { LinkCheckReport } from "../../types/types";
import styles from "./ReportViewer.module.css";
import { Button } from "../button/Button";

interface ReportViewerProps {
  report: LinkCheckReport | null;
}

export const ReportViewer = ({ report }: ReportViewerProps) => {
  const [showFails, setShowFails] = useState<boolean>(false);

  const handleShowFailed = () => {
    setShowFails((prev) => !prev);
  };

  return (
    <div className={styles.report}>
      <h3>Check report</h3>
      <div className={styles.reportMainData}>
        <div className={styles.reportMetric}>
          <span>Links checked:</span>
          <span className={styles.countData}>{report ? report.linksTotalCount : "N/A"}</span>
        </div>
        <div className={styles.reportMetric}>
          <span>Success:</span>
          <span className={styles.countData}>{report ? report.linksSuccessCount : "N/A"}</span>
        </div>
        <div className={styles.reportMetric}>
          <span>Fail:</span>
          <span className={styles.countData}>{report ? report.linksFailCount : "N/A"}</span>
        </div>
      </div>

      {report?.linksFailCount && report.linksFailCount > 0 ? (
        <div className={styles.failedLinksWrapper}>
          <div className={styles.failedLinksHeader}>
            <h3>Failed links</h3>
            <Button
              type="button"
              title={showFails ? "Hide" : "Show"}
              variant="accordeon"
              className="button"
              onClick={handleShowFailed}
            />
          </div>
          {showFails && (
            <div className={styles.failedLinksList}>
              {report.linksFailList.map((link) => (
                <div className={styles.failedLink}>
                  <a href={link} target="_blank">
                    {link}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
