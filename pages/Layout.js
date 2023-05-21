/* Layout.js */
import React, { useContext, useState, useEffect } from "react";
import styles from "../styles/Layout.module.css";
import Link from "next/link";
import ThemeContext from "../ThemeContext";

const Layout = ({ children }) => {
  const { darkTheme } = useContext(ThemeContext);
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    const fetchNavLinks = async () => {
      const response = await fetch("/api/posts");
      const posts = await response.json();
      setNavLinks(posts);
    };

    fetchNavLinks();
  }, []);

  const containerClassName = darkTheme
    ? `${styles.container} ${styles.darkTheme}`
    : `${styles.container} ${styles.whiteTheme}`;
  const sidebarClassName = darkTheme
    ? `${styles.sidebar} ${styles.darkTheme}`
    : styles.sidebar;
  const navItemClassName = darkTheme
    ? `${styles.navItem} ${styles.darkTheme}`
    : styles.navItem;

  return (
    <div className={containerClassName}>
      <nav className={sidebarClassName}>
        <ul className={styles.navList}>
          <li className={navItemClassName}>
            <Link href="/">Homepage</Link>
          </li>
          {navLinks.map((link) => (
            <li className={navItemClassName} key={link.slug}>
              <Link href={`/${link.slug}`}>{link.slug}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Layout;
