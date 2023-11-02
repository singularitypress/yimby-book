import { getMarkdownPaths } from "@/util";
import { GetStaticProps } from "next";
import Link from "next/link";

const Home = () => {
  const paths = getMarkdownPaths("content");

  return (
    <ul>
      {paths.map((path) => (
        <li key={path}>
          <Link href={path}>{path}</Link>
        </li>
      ))}
    </ul>
  );
};

export const generateStaticParams = async () => {
  const paths = getMarkdownPaths("content");
  return {
    paths,
    fallback: false,
  };
};

export default Home;
