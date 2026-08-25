// front/src/types/types.ts

export interface LinkCheckReport {
  linksTotalCount: number;
  linksSuccessCount: number;
  linksFailCount: number;
  linksFailList: string[];
  linksSuccessList: string[];
}

export interface CheckResponse {
  report?: LinkCheckReport;
  succes: boolean;
  message: string;
}
