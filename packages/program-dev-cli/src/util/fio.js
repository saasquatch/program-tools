import path from 'path';
import fs from 'fs';

import findUp from 'find-up';

export const findFilePair = async (filePath) => {
  const ext = path.extname(filePath);
  const basename = path.basename(filePath, ext);
  const dirName = path.dirname(filePath);

  if (ext !== '.js') {
    return null;
  }

  const complimentFileName = `${basename}_schema.json`;

  let complimentFilePath;
  try {
    complimentFilePath = path.join(dirName, 'programSchemas', complimentFileName);
    fs.accessSync(complimentFilePath, fs.constants.F_OK | fs.constants.W_OK);
  } catch (err) {
    complimentFilePath = await findUp(complimentFileName, null, dirName);
    if (complimentFilePath === null) {
      return null;
    }
  }

  return {
    source: path.join(dirName, `${basename}${ext}`),
    schema: complimentFilePath
  };
};