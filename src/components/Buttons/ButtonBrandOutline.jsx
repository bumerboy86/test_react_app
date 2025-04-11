import React from "react";
import styles from "./ButtonBrandOutline.module.css";

export const ButtonBrandOutline = ({
  fn,
  cont,
  image: Icon,
  type = "button",
  disable = false,
}) => {
  return (
    <button
      className={styles.buttonOutline}
      onClick={fn}
      type={type}
      disabled={disable}
    >
      {Icon && <Icon fill="currentColor" className={styles.icon} />}
      {cont}
    </button>
  );
};
