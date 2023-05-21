import { useState, useEffect } from "react";
import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
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
