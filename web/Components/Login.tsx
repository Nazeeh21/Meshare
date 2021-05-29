import React from "react";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  return (
    <div
      style={{
        backgroundColor: "#4aa96c",
        width: "12vw",
        padding: "0.5rem",
        borderRadius: "0.2rem",
        fontWeight: "bold",
      }}
      className="text-center mt-3"
    >
      <a
        href="http://localhost:4000/auth/github/"
        style={{ textDecoration: "none" }}
        className="text-white"
      >
        Login using github
      </a>
    </div>
  );
};
