import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useMainContext } from "../contexts/MainContext";

const CharacterApp = () => {
  const { theme } = useTheme();
  const { text, setText } = useMainContext();
  const [excludeSpaces, setExcludeSpaces] = useState(false);

  // Handle text change in the textarea
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle exclude spaces toggle
  const handleExcludeSpacesChange = (e) => {
    setExcludeSpaces(e.target.checked);
  };

  return (
    <div className="w-full max-w-2xl px-4 py-6 mx-auto">
      {/* Main heading */}
      <h1
        className={`${
          theme === "dark" ? "text-white" : "text-black"
        } font-nunito text-3xl font-bold mb-2`}
      >
        Analyze your text in real-time.
      </h1>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={handleTextChange}
        className={`w-full my-6 h-40 p-4 rounded-lg border ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-black placeholder-gray-500"
        } focus:outline-none focus:ring-2 ${
          theme === "dark" ? "focus:ring-blue-500" : "focus:ring-blue-400"
        } resize-none`}
        placeholder="Type or paste your text here..."
      ></textarea>

      <div className="flex justify-between items-center">
        {/* Checkbox options */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="exclude-spaces"
              checked={excludeSpaces}
              onChange={handleExcludeSpacesChange}
              className={`form-checkbox h-5 w-5 rounded border cursor-pointer ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-blue-500"
                  : "bg-white border-gray-300 text-blue-600"
              } focus:ring-blue-500 mr-2`}
            />
            <label
              htmlFor="exclude-spaces"
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Exclude Spaces
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="character-limit"
              className={`form-checkbox h-5 w-5 rounded border cursor-pointer ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-blue-500"
                  : "bg-white border-gray-300 text-blue-600"
              } focus:ring-blue-500 mr-2`}
            />
            <label
              htmlFor="character-limit"
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Set Character Limit
            </label>
          </div>
        </div>
        <p
          className={`mt-3 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Approx. reading time:{" "}
          {Math.ceil(text.split(/\s+/).filter(Boolean).length / 200)} minute
        </p>
      </div>
    </div>
  );
};

export default CharacterApp;
