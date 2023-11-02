import { getMarkdownPaths } from "@/util";
import Link from "next/link";
import { Container } from "@components";

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
