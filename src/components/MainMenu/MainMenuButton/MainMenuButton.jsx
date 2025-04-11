import React from "react";

export const MainMenuButton = ({ fn, image: Icon }) => {
  return <button onClick={fn}>{Icon && <Icon className="icon" />}</button>;
};
