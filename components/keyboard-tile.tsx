import { useCallback } from "react";
import useWordle from "../context/use-wordle";

export default function KeyboardTile({
  char,
  className,
}: {
  char: string;
  className?: string;
}) {
  const state = useWordle();

  const allCharFoundInSolution = useCallback(() => {
    let result = false;
    state.guesses.forEach((guess) => {
      if (state.characters[char]?.positions.every((pos) => (guess[pos] === state.solution[pos]))) {
        result = true;
      }
    });
    return result;
  }, [char, state.characters, state.guesses, state.solution]);
  const charIsNotInSolution = useCallback(() => state.guesses.some((guess) => (guess.includes(char) && !state.solution.includes(char))), [char, state.guesses, state.solution]);
  const charIsInSolution = useCallback(() => state.guesses.some((guess) => (guess.includes(char) && state.solution.includes(char))), [char, state.guesses, state.solution]);
  return <div onClick={() => {
    if (state.currentGuess.length < 5) {
      state.setState((s) => ({ ...s, currentGuess: s.currentGuess + char }));
    }
  }} className={`flex justify-center items-center rounded px-4 py-3 cursor-pointer ${allCharFoundInSolution() ? "bg-[#e02e8c]" : charIsNotInSolution() ? "" : charIsInSolution() ? "bg-[#ea7fb3]" : "bg-black bg-opacity-10"} ${className}`}>{char}</div>;
}