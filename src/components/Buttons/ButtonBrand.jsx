import React from "react";
import styles from "./ButtonBrand.module.css";

export const ButtonBrand = ({
  fn,
  cont,
  image,
  type = "button",
  disable = false,
}) => {
  return (
    <button
      className={styles.buttonBrand}
      onClick={fn}
      type={type}
      disabled={disable}
    >
      {image && <img src={image} alt="main-logo" />} {cont}
    </button>
  );
};
