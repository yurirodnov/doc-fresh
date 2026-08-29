// back/src/services/checkFileService.ts

import fs from "fs/promises";

interface FailedLinkItem {
  link: string;
  code?: number | null;
}

interface FileCheckReport {
  linksTotalCount: number;
  linksSuccessCount: number;
  linksFailCount: number;
  linksFailList: FailedLinkItem[];
  linksSuccessList: string[];
}

const URL_REGEXP = /https?:\/\/[^\s'")]+/g;

export const checkFileService = async (
  filePath: string,
  fileOriginalName: string,
  fileMimeType: string,
): Promise<FileCheckReport> => {
  const checkReport: FileCheckReport = {
    linksTotalCount: 0,
    linksSuccessCount: 0,
    linksFailCount: 0,
    linksFailList: [],
    linksSuccessList: [],
  };

  if (!fileMimeType.startsWith("text/") && fileMimeType !== "application/json") {
    throw new Error("Unsupported file format");
  }

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const extractedLinks = fileContent.match(URL_REGEXP) || [];
    const uniqueLinks = [...new Set(extractedLinks)];

    checkReport.linksTotalCount = uniqueLinks.length;

    if (checkReport.linksTotalCount === 0) {
      return checkReport;
    }

    const checkPromises = uniqueLinks.map(async (link) => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(link, {
          method: "HEAD",
          signal: controller.signal,
        });

        const code = response.status;

        clearTimeout(timeout);

        if (response.ok) {
          return { link, code, status: "success" as const };
        } else {
          return { link, code, status: "fail" as const };
        }
      } catch (err) {
        return { link, status: "fail" as const };
      }
    });

    const results = await Promise.allSettled(checkPromises);
    console.log(results);

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        if (result.value.status === "success") {
          checkReport.linksSuccessList.push(result.value.link);
          checkReport.linksSuccessCount += 1;
        } else {
          const failedLinkData: FailedLinkItem = {
            link: "",
            code: null,
          };
          failedLinkData.link = result.value.link;
          failedLinkData.code = result.value.code;

          checkReport.linksFailList.push(failedLinkData);
          checkReport.linksFailCount += 1;

          // checkReport.linksFailList.push(result.value.link);
        }
      }
    });

    return checkReport;
  } catch {
    throw new Error(`Unable to read ${filePath}`);
  }
};

export const removeFile = async () => {};
