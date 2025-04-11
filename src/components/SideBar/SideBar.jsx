import React from "react";
import styles from "./SideBar.module.css";
import { ButtonBrand } from "../Buttons/ButtonBrand";
import { useNavigate } from "react-router-dom";

export const SideBar = ({ isOpen }) => {
  const navigate = useNavigate();
  return (
    <div
      className={[styles.sideBar, isOpen && styles.sideBar_open]
        .filter(Boolean)
        .join(" ")}
    >
      <section>
        <p className={styles.sideBar_logo}>Oak Tree Cemetery</p>
        <p className={styles.sideBar_logo_sub}>Process Manager</p>
        <hr className={styles.sideBar_hr} />
      </section>
      <section className={styles.sideBar_buttons}>
        <ButtonBrand cont={"Organizations"} fn={() => navigate("company/12")} />
        <ButtonBrand cont={"Contractors"} fn={() => navigate("contacts/16")} />
        <ButtonBrand cont={"Clients"} fn={() => navigate("clients")} />
      </section>
      <p className={styles.sideBar_footer_txt}>
        All Funeral Services © 2015-2025
      </p>
    </div>
  );
};
