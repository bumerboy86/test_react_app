import { Outlet } from "react-router-dom";
import { Container } from "../Container/Container";
import { MainMenu } from "../MainMenu/MainMenu";
import { SideBar } from "../SideBar/SideBar";
import styles from "./Layout.module.css";
import { useState } from "react";

export const Layout = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <MainMenu openMenuFn={() => setisOpen((prev) => !prev)} />
      <SideBar isOpen={isOpen} />
      <Container hasMenu={isOpen}>
        <Outlet />
      </Container>
    </div>
  );
};
