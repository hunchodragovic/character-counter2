import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Sun, SunMoon, CloudMoon } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useTheme("dark");

  return (
    <>
      <div className="flex justify-between items-center w-full px-4 py-2">
        <div className="flex items-center gap-2 cursor-pointer">
          <CloudMoon
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } w-8 h-8 mx-4`}
          />

          <p
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } "font-nunito text-lg font-bold text-white"`}
          >
            Character Counter
          </p>
        </div>
        <div>
          <button onClick={toggleTheme} className="cursor-pointer">
            {theme === "dark" ? <Sun className="text-white" /> : <SunMoon />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
