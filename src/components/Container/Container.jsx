import React from "react";
import styles from "./Container.module.css";

export const Container = ({ hasMenu, children }) => {
  return (
    <main
      className={[styles.container, hasMenu && styles.cont_open]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </main>
  );
};
