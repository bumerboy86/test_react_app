import React from "react";
import styles from "./BackDrop.module.css";

export const BackDrop = ({ open, setOpen, children }) => {
  return (
    open && (
      <div className={styles.backdrop} onClick={setOpen}>
        {children}
      </div>
    )
  );
};
