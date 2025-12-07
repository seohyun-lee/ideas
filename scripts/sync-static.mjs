import { mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const staticDirs = ['game', 'web'];

async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

async function collectHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectHtmlFiles(fullPath);
      }
      if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
        return fullPath;
      }
      return [];
    }),
  );
  return files.flat();
}

async function syncStaticFiles() {
  await ensureDir(publicDir);

  for (const relativeDir of staticDirs) {
    const sourceDir = path.join(rootDir, relativeDir);
    const files = await collectHtmlFiles(sourceDir);
    for (const filePath of files) {
      const relativePath = path.relative(rootDir, filePath);
      const destinationPath = path.join(publicDir, relativePath);
      await ensureDir(path.dirname(destinationPath));
      await copyFile(filePath, destinationPath);
      console.log(`Copied ${relativePath} -> public/${relativePath}`);
    }
  }
}

syncStaticFiles().catch((error) => {
  console.error('Failed to sync static html files:', error);
  process.exitCode = 1;
});
