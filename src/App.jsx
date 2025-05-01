import React from "react";
import Header from "./components/Header";
import { useTheme } from "./contexts/ThemeContext";
import CharacterApp from "./components/CharacterApp";
import Card from "./components/Card";
import LetterDensity from "./components/LetterDensity";
import { useMainContext } from "./contexts/MainContext";

const App = () => {
  const { theme } = useTheme();
  const { text, totalCharacters, wordCounter, sentenceCounter } =
    useMainContext();

  // Calculate stats
  const charCount = totalCharacters(text);
  const wordCount = wordCounter(text);
  const sentenceCount = sentenceCounter(text);

  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        } min-h-screen flex flex-col items-center transition-all duration-300`}
      >
        <Header />
        <CharacterApp />
        <div className="flex gap-4 w-full max-w-2xl px-4 pb-6 mx-auto">
          <Card title="Total Characters" value={charCount.toString()} />
          <Card title="Word Count" value={wordCount.toString()} />
          <Card
            title="Sentence Count"
            value={sentenceCount.toString().padStart(2, "0")}
          />
        </div>
        <LetterDensity />
      </div>
    </>
  );
};

export default App;
