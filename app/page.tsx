import Link from "next/link";
import { Container } from "@components";
import { getMarkdownPaths } from "@util";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const Home = () => {
  const paths = getMarkdownPaths("content");

  return (
    <Container>
      <ul>
        {paths.map((path) => (
          <li key={path}>
            <Link href={`/book/${path}`}>{path}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Home;
