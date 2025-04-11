import React, { useState } from "react";
import styles from "./MainMenu.module.css";

import { MainMenuButton } from "./MainMenuButton/MainMenuButton";
import { useNavigate } from "react-router-dom";

import mainLogo from "../../assets/logo.svg";
import Company from "../../assets/Company.svg";
import Deceased from "../../assets/Deceased.svg";
import Settings from "../../assets/Settings.svg";
import SignOut from "../../assets/SignOut.svg";
import Account from "../../assets/Account.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { LoginModal } from "../modals/LoginModal";

export const MainMenu = ({ openMenuFn }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.main_menu}>
      <LoginModal open={openMenu} setOpen={handleOpenMenu} />
      <section>
        <MainMenuButton image={mainLogo} fn={() => navigate("/")} />
        <MainMenuButton image={Company} fn={() => navigate("/company/12")} />
        <MainMenuButton image={Deceased} fn={() => navigate("/search")} />
      </section>
      <section>
        <MainMenuButton image={Settings} fn={openMenuFn} />
        {username ? (
          <MainMenuButton image={SignOut} fn={handleLogout} />
        ) : (
          <MainMenuButton image={Account} fn={handleOpenMenu} />
        )}
      </section>
    </div>
  );
};
