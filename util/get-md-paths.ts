import { readdirSync, statSync } from "fs";
import path from "path";

export const getMarkdownPaths = (dir: string): string[] => {
  let markdownPaths: string[] = [];

  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      markdownPaths = markdownPaths.concat(getMarkdownPaths(filePath));
    } else if (path.extname(filePath) === ".md") {
      markdownPaths.push(filePath.replace(/\.md$/gm, ""));
    }
  }

  return markdownPaths;
};
