// back/src/services/fileCheckerService.ts

import path from "path";
import fs from "fs/promises";
import { fstatSync } from "fs";

export const checkFile = async (filePath: string, fileOriginalName: string, fileMimeType: string): Promise<string> => {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return fileContent;
  } catch {
    throw new Error(`Unable to read ${filePath}`);
  }
};

export const removeFile = async () => {};
