// back/src/services/fileCheckerService.ts

import fs from "fs/promises";

const URL_REGEXP = /https?:\/\/[^\s'")]+/g;

export const checkFile = async (
  filePath: string,
  fileOriginalName: string,
  fileMimeType: string,
): Promise<string[] | null> => {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const extractedLinks = fileContent.match(URL_REGEXP);
    const uniqueLinks = [...new Set(extractedLinks)];

    if (uniqueLinks.length !== 0) {
      return uniqueLinks;
    }

    return null;
  } catch {
    throw new Error(`Unable to read ${filePath}`);
  }
};

export const removeFile = async () => {};
