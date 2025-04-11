import React, { useState } from "react";
import { BackDrop } from "../BackDrop/BackDrop";
import styles from "./Modal.module.css";
import { ButtonBrand } from "../Buttons/ButtonBrand";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../store/slices/userSlice";

export const LoginModal = ({ open, setOpen }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [username, setUserName] = useState("");
  const dispatch = useDispatch();

  const onSubmitHandler = async () => {
    setIsFetching(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}auth?user=${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const token = response.headers.get("Authorization");

      if (token) {
        dispatch(setAuthUser({ username: username, token: token }));
      }
      setIsFetching(false);
      setUserName("");
      setOpen();
    } else {
      setIsFetching(false);
      setUserName("");
      alert(`Ошибка авторизации: ${response.statusText}`);
    }
  };

  return (
    <>
      <BackDrop open={open}>
        <form onClick={(e) => e.stopPropagation()} className={styles.loginForm}>
          <h2 className="form_title">Sign in to your account</h2>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Eternal Rest Funeral Home"
          />
          <div className="form_group">
            <ButtonBrand
              cont={"Login"}
              fn={onSubmitHandler}
              disable={isFetching}
            />
            <ButtonBrand cont={"Cancel"} fn={setOpen} />
          </div>
        </form>
      </BackDrop>
    </>
  );
};
