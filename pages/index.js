import { useState, useEffect } from "react";
import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import Card from "/pages/Card";

const cards = [
  {
    title: 'Card 1',
    description: 'Descrição do Card 1',
    link: '/about.md',
  },
  {
    title: 'Card 2',
    description: 'Descrição do Card 2',
    link: '/projects.md',
  },
  // Adicione mais objetos para mais cards, se necessário
];

export default function Home({ content }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="container">
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}

export async function getStaticProps() {
  const contentDirectory = path.join(process.cwd(), "content");
  const indexPath = path.join(contentDirectory, "index.md");
  const content = fs.readFileSync(indexPath, "utf-8");
  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  const htmlContent = result.toString();

  return {
    props: {
      content: htmlContent,
    },
  };
}
