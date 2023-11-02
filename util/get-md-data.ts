import matter from "gray-matter";
import { readFileSync } from "fs";
import { config } from "dotenv";

config();

const { FRONT_MATTER_ARRAYS } = process.env;

export const getMatterData = (filePath: string) => {
  const fileContent = readFileSync(filePath, "utf-8");
  const matterData = matter(fileContent);

  if (FRONT_MATTER_ARRAYS) {
    const frontMatterArrays = FRONT_MATTER_ARRAYS.split(",");
    frontMatterArrays.forEach((frontMatterArray) => {
      if (matterData.data[frontMatterArray]) {
        matterData.data[frontMatterArray] =
          matterData.data[frontMatterArray].split(",");
      }
    });
  }

  return matterData;
};
