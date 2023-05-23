import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import "../styles/globals.css";
import { ThemeProvider } from "../ThemeContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Layout";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <ThemeProvider value={{ theme, toggleTheme }}>
    <Layout>
    
      <div>
        
        <Component {...pageProps} />

        <button className={`theme-toggle ${theme}`} onClick={toggleTheme}>
          {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
        </button>
        </div>
   
      </Layout>
           
      </ThemeProvider>
  );
}

export default MyApp;
