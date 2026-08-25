// front//src/components/report-viewer/ReportViewer.tsx

import type { LinkCheckReport } from "../../types/types";
import styles from "./ReportViewer.module.css";

interface ReportViewerProps {
  report: LinkCheckReport | null;
}

export const ReportViewer = ({ report }: ReportViewerProps) => {
  return <div>{report ? report.linksTotalCount : "No data"}</div>;
};
