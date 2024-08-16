import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate("/");
  };

  return (
    <div className="border-b border-black p-4 bg-slate-300">
      <h1
        className="text-4xl font-bold cursor-pointer"
        onClick={handleHeaderClick}
      >
        My Form
      </h1>
    </div>
  );
};

export default Header;
