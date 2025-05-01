import { createContext, useContext, useState } from "react";

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  // State to store the text from the textarea
  const [text, setText] = useState("");

  // Function to count characters (excluding non-alphanumeric)
  const characterCounter = (paragraph) => {
    return paragraph.replace(/[^a-zA-Z0-9]/g, "").length;
  };

  // Function to count total characters
  const totalCharacters = (paragraph) => {
    return paragraph.length;
  };

  // Function to count words
  const wordCounter = (paragraph) => {
    return paragraph.trim() === "" ? 0 : paragraph.trim().split(/\s+/).length;
  };

  // Function to count sentences
  const sentenceCounter = (paragraph) => {
    return paragraph.trim() === ""
      ? 0
      : paragraph.split(/[.!?]+/).filter(Boolean).length;
  };

  const value = {
    text,
    setText,
    characterCounter,
    totalCharacters,
    wordCounter,
    sentenceCounter,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};
