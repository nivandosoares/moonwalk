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

  const sidebarClassName = darkTheme
    ? `${styles.sidebar} ${styles.customSidebarDark}`
    : `${styles.sidebar} ${styles.customSidebar}`;

  return (
    <div className={`container-fluid ${styles.container} {$styles.content}`}>
      <div className={`row justify-content-center align-items-start`}>
        {/* Sidebar */}
        <nav className={`col-lg-2 ${sidebarClassName}`}>
          <div className="sidebar-heading">Sidebar</div>
          <ul className={`nav flex-column ${styles.navList}`}>
            {navLinks.map((link) => (
              <li className={`nav-item ${styles.navItem}`} key={link.slug}>
                <Link href={`/posts/${link.slug}`} className={`nav-link ${styles.navLink}`}>
                  {link.slug}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Conteúdo */}
        <main className={`col-lg-10 ${styles.content}`}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
