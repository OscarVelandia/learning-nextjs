import { readdirSync, readFileSync } from "fs";
import path from "path";
import remark from "remark";
// @ts-ignore - This library doesn't have types at this moment
import html from "remark-html";
import matter from "gray-matter";

export interface Metadata {
  id: string;
  title: string;
  date: string;
}

// path is a node.js method
const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPostIds() {
  // readdirSync return an array with the name of the items inside the posts directory
  const fileNames = readdirSync(postsDirectory);

  // Here is returned an object where the id is the file name without the extension
  return fileNames.map((fileName) => ({ params: { id: fileName.replace(/\.md$/, "") } }));
}

export async function getPostData(id: string): Promise<Metadata[]> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = readFileSync(fullPath, "utf8"); // Is sync because it will be generated in build time

  // data {title: string, date: string}
  const { data, content }: { data: any; content: string } = matter(fileContents); // Use gray-matter to parse the post metadata section
  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...data,
  };
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = readdirSync(postsDirectory);
  const allPostsData = fileNames.map(
    (fileName): Metadata => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult: { data: any; content: string } = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
      };
    }
  );
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
