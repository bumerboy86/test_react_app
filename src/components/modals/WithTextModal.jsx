import React, { useEffect, useState } from "react";
import { BackDrop } from "../BackDrop/BackDrop";
import styles from "./Modal.module.css";
import { ButtonBrand } from "../Buttons/ButtonBrand";

export const WithTextModal = ({
  open,
  setOpen,
  isFetching = false,
  fn = () => {},
  title = "Empty",
  cont = "",
  placeholder = "",
  btn_accept = "Save Changes",
  btn_cancel = "Cancel",
}) => {
  const [text, setText] = useState("");

  const onSubmitHandler = async () => {
    fn(text);
    setText("");
  };

  useEffect(() => {
    if (open) {
      setText(cont);
    }
  }, [open]);

  return (
    <>
      <BackDrop open={open}>
        <form onClick={(e) => e.stopPropagation()} className={styles.loginForm}>
          <h2 className="form_title">{title}</h2>
          <input
            type="text"
            id="some_txt"
            name="some_txt"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
          />
          <div className="form_group">
            <ButtonBrand
              cont={btn_accept}
              fn={onSubmitHandler}
              disable={isFetching}
            />
            <ButtonBrand cont={btn_cancel} fn={setOpen} disable={isFetching} />
          </div>
        </form>
      </BackDrop>
    </>
  );
};
