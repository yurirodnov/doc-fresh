// back/src/services/removeFileService.ts

import fs from "fs/promises";

export const removeFileService = async (filepath: string): Promise<void> => {
  try {
    await fs.unlink(filepath);
    console.log(`${filepath} was removed`);
  } catch (error) {
    console.error(`Failed to remove ${filepath}`, error);
  }
};
