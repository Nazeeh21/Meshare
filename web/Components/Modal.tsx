import React from "react";

export const Modal = ({ children }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="body">{children}</div>
      </div>
    </div>
  );
};
