// front/src/types/types.ts

interface FailedLinkItem {
  link: string;
  code?: number | null;
}

export interface LinkCheckReport {
  linksTotalCount: number;
  linksSuccessCount: number;
  linksFailCount: number;
  linksFailList: FailedLinkItem[];
  linksSuccessList: string[];
}

export interface CheckResponse {
  report?: LinkCheckReport;
  succes: boolean;
  message: string;
}
