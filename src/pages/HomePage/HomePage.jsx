import React from "react";
import styles from "./HomePage.module.css";
import { useSelector } from "react-redux";

export const HomePage = () => {
  const { username, token } = useSelector((state) => state.user);
  return (
    <div className={styles.home_page}>
      <h1>Welcome!!! to AFS.Test Assignment</h1>
      <p>
        This is a demo project created as part of a test task. It showcases
        basic functionality such as layout, sidebar navigation, and routing
        using React.
      </p>
      <p>
        Please use the menu to explore different sections of the application.
      </p>

      <p>username: {username}</p>
      <p>token: {token}</p>
    </div>
  );
};
