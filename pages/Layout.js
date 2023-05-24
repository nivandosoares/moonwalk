import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "../ThemeContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Layout = ({ children }) => {
  const { darkTheme } = useContext(ThemeContext);
  const [navLinks, setNavLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavLinks = async () => {
      const response = await fetch("/api/posts");
      const posts = await response.json();
      setNavLinks(posts);
      setLoading(false);
    };

    fetchNavLinks();
  }, []);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
        style={{ height: "60px" }}
      >
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="ml-auto"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto justify-content-center">
            {loading ? (
              <p id="loading">...</p>
            ) : (
              navLinks.map((link) => (
                <Nav.Link href={`/posts/${link.slug}`} key={link.slug}>
                  {link.slug}
                </Nav.Link>
              ))
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div
        className={`d-flex align-items-center mt-5 `}
        style={{ marginTop: "60px" }}
      >
        {loading ? (
          <center>
            <p id="loading">...</p>
          </center>
        ) : (
          <main
            className={`col-lg-10 d-flex justify-content-center align-items-center`}
          >
            {children}
          </main>
        )}
      </div>
    </>
  );
};

export default Layout;
