// back/src/services/checkFileService.ts

import fs from "fs/promises";
import mammoth from "mammoth";
import { PDFParse, TextResult } from "pdf-parse";
import { TextContent } from "pdfjs-dist/types/src/display/api";

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

const ALLOWED_MIME_TYPES = [
  "text/plain",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_LINKS_IN_FILE_ALLOWED = 120;

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

  // if (!fileMimeType.startsWith("text/") && fileMimeType !== "application/json") {
  //   throw new Error("Unsupported file format");
  // }

  if (!ALLOWED_MIME_TYPES.includes(fileMimeType)) {
    throw new Error("Unsupported file format");
  }

  try {
    let fileContent: string = "";

    if (fileMimeType === "text/plain") {
      fileContent = await fs.readFile(filePath, "utf-8");
    } else if (fileMimeType === "application/pdf") {
      const buffer = await fs.readFile(filePath);
      const uint8Array = new Uint8Array(buffer);
      const parser = new PDFParse(uint8Array);
      const textResult = await parser.getText();
      fileContent = textResult.text;
      console.log(fileContent);
    } else if (fileMimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const docxData = await mammoth.extractRawText({ path: filePath });
      fileContent = docxData.value;
    }

    const extractedLinks = fileContent.match(URL_REGEXP) || [];
    const uniqueLinks = [...new Set(extractedLinks)];

    if (uniqueLinks.length > MAX_LINKS_IN_FILE_ALLOWED) {
      throw new Error(`Too many links in file. Max allowed count is ${MAX_LINKS_IN_FILE_ALLOWED}`);
    }

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
          redirect: "follow",
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
  } catch (error) {
    console.log(`File processing error: ${error} `);
    throw new Error(`Unable to read ${filePath}`);
  }
};

export const removeFile = async () => {};
