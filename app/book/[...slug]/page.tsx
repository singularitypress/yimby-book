import { getMarkdownPaths, getMatterData } from "@/util";
import { NextPage } from "next";
import Markdown from "react-markdown";
import { Container } from "@components";
import Head from "next/head";

async function getData(mdPath: string) {
  const res = getMatterData(mdPath);

  return res;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const data = await getData(params.slug.join("/") + ".md");

  return {
    title: data.data.title,
    description: data.data.description,
  };
}

const Page: NextPage<{ params: { slug: string[] } }> = async ({ params }) => {
  const data = await getData(params.slug.join("/") + ".md");

  return (
    <>
      <Head>
        <title>{data.data.title}</title>
      </Head>
      <Container variant="article">
        <Markdown className="markdown">{data.content}</Markdown>
      </Container>
    </>
  );
};

export default Page;

export const generateStaticParams = async () => {
  const paths = getMarkdownPaths("content");
  return paths.map((path) => ({
    slug: path.split("/"),
  }));
};
