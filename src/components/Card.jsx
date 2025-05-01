import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const Card = ({ title, value }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-lg h-28 w-full ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <span className="text-3xl font-bold">{value}</span>
      <span
        className={`text-sm mt-2 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {title}
      </span>
    </div>
  );
};

export default Card;
