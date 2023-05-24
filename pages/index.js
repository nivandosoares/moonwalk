// pages/HomePage.js

import React from "react";
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Layout from "./Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/HomePage.module.css";

function HomePage({ content, posts }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    
      <div className={styles.content}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
  
  );
}

export async function getStaticProps() {
  const filePath = "posts/index.md";
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContents, { excerpt: false });

  const postsDirectory = "posts";
  const postFilenames = fs.readdirSync(postsDirectory);

  const posts = postFilenames.map((filename) => {
    const postFilePath = `posts/${filename}`;
    const postFileContents = fs.readFileSync(postFilePath, "utf8");
    const { data } = matter(postFileContents);

    return {
      slug: filename.replace(".md", ""),
      title: data.title || "Sem título",
    };
  });

  return {
    props: {
      content,
      posts,
    },
  };
}

export default HomePage;
