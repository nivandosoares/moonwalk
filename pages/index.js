// pages/HomePage.js

import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Layout from './Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './HomePage.module.css';

function HomePage({ content }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <Layout>
      <div className={styles.container}>
       
        <div className={styles.content}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
       
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const filePath = 'content/index.md';
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContents, { excerpt: false });

  const postsDirectory = 'content';
  const postFilenames = fs.readdirSync(postsDirectory);

  const posts = postFilenames.map((filename) => {
    const postFilePath = `content/${filename}`;
    const postFileContents = fs.readFileSync(postFilePath, 'utf8');
    const { data } = matter(postFileContents);

    return {
      slug: filename.replace('.md', ''),
      title: data.title || 'Sem título',
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
