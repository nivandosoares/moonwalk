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

  return <main className={styles.content}>{children}</main>;
};

export default Layout;
