import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

export default function Post({ content, data }) {
  return (
    <div className="container">
      <Head>
        <title>{data.title}</title>
      </Head>
      <article className="post">
        <h1>{data.title}</h1>
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "content");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  return {
    props: {
      content,
      data,
    },
  };
}
