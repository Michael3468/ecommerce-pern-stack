import path from 'path';
import { fileURLToPath } from 'url';

/**
 * `import.meta.url`: string. It represents the URL of the current module.
 *
 * Usage:
 * const __dirname = getDirName(import.meta.url)
 */
const getDirName = (importMetaUrl: string) => {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = path.dirname(__filename);

  return __dirname;
};

export default getDirName;
