import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useMainContext } from "../contexts/MainContext";

const LetterDensity = () => {
  const { theme } = useTheme();
  const { text } = useMainContext();
  const [expanded, setExpanded] = useState(false);
  const [letterData, setLetterData] = useState([]);

  // Calculate letter frequency when text changes
  useEffect(() => {
    if (!text) {
      setLetterData([]);
      return;
    }

    // Count letter frequency
    const letterCounts = {};
    const filteredText = text.toLowerCase().replace(/[^a-z]/g, "");

    // Count each letter
    for (let char of filteredText) {
      letterCounts[char] = letterCounts[char] ? letterCounts[char] + 1 : 1;
    }

    // Convert to array and calculate percentages
    const totalLetters = filteredText.length || 1; // Avoid division by zero
    const letterArray = Object.entries(letterCounts).map(([letter, count]) => {
      const percentage = (count / totalLetters) * 100;
      return {
        letter: letter.toUpperCase(),
        count,
        percentage: parseFloat(percentage.toFixed(2)),
      };
    });

    // Sort by frequency (highest first)
    const sortedLetters = letterArray.sort((a, b) => b.count - a.count);

    setLetterData(sortedLetters);
  }, [text]);

  // Calculate max percentage for scaling
  const maxPercentage =
    letterData.length > 0
      ? Math.max(...letterData.map((item) => item.percentage))
      : 100;

  // Scale factor ensures the largest bar is 100% width
  const scaleFactor = 100 / (maxPercentage || 1); // Avoid division by zero

  // Display only first 5 items if not expanded
  const displayData = expanded ? letterData : letterData.slice(0, 5);

  return (
    <div className="w-full max-w-2xl px-4 pb-6 mx-auto">
      <div
        className={`p-6 rounded-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Letter Density
        </h2>

        {letterData.length > 0 ? (
          <>
            <div className="space-y-3">
              {displayData.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span
                      className={`font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.letter}
                    </span>
                    <span
                      className={`${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {item.count}{" "}
                      <span className="opacity-70">({item.percentage}%)</span>
                    </span>
                  </div>

                  <div
                    className={`w-full ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    } rounded-full h-2`}
                  >
                    <div
                      className="bg-purple-400 h-2 rounded-full"
                      style={{ width: `${item.percentage * scaleFactor}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {letterData.length > 5 && (
              <button
                className={`mt-4 flex items-center text-sm ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                } hover:underline`}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "See less" : "See more"}{" "}
                {expanded ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </button>
            )}
          </>
        ) : (
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
            Type something to see letter frequency analysis
          </p>
        )}
      </div>
    </div>
  );
};

export default LetterDensity;
