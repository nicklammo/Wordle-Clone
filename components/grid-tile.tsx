"use client";
import { useCallback } from "react";
import useWordle from "../context/use-wordle";

export default function GridTile({
  columnIndex,
  rowIndex,
}: {
  columnIndex: number;
  rowIndex: number;
}) {
  const state = useWordle();

  const renderCurrentGuessChar = useCallback(() => {
    const isCurrentRow = rowIndex === state.guesses.length;
    const hasChar = !!state.currentGuess.charAt(columnIndex);
    const renderChar = state.currentGuess.charAt(columnIndex);

    return isCurrentRow && hasChar ? renderChar : null;
  }, [columnIndex, state.currentGuess, rowIndex, state.guesses.length]);

  const renderPreviousGuessChar = useCallback(() => {
    const isPreviousRow = rowIndex !== state.guesses.length;
    const hasChar = state.guesses[rowIndex] && state.guesses[rowIndex].charAt(columnIndex);
    const renderChar = state.guesses[rowIndex]?.charAt(columnIndex);

    return isPreviousRow && hasChar ? renderChar : null;
  }, [columnIndex, rowIndex, state.guesses]);

  const charIsExactMatch = useCallback(() =>
  (state.guesses[rowIndex].charAt(columnIndex) === state.solution.charAt(columnIndex)
  ), [columnIndex, rowIndex, state.guesses, state.solution]);

  const charExistsElsewhere = useCallback(() => {
    const guess = state.guesses[rowIndex];
    const guessChar = guess.charAt(columnIndex);

    const solutionCharPositions = state.characters[guessChar]?.positions || [];
    const guessCharPositions = guess.split("").reduce((acc, currentChar, index) => {
      if (currentChar === guessChar) {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);

    const guessCharCount = guessCharPositions.length;
    const solutionCharCount = solutionCharPositions.length;

    if (guessCharCount > solutionCharCount) {
      const excessPositions = guessCharPositions.slice(solutionCharCount);
      if (excessPositions.includes(columnIndex)) {
        return false;
      }
    }

    return solutionCharPositions
      .some((pos) =>
        (guess.charAt(pos) !== state.solution.charAt(pos))
      )
  }, [columnIndex, rowIndex, state.characters, state.guesses, state.solution]);

  return (
    <div className={
      (!!state.guesses[rowIndex] ?
        (charIsExactMatch())
          ? "bg-[#e02e8c]"
          : (charExistsElsewhere())
            ? "bg-[#ea7fb3]"
            : ""
        : null) + " w-[70px] h-[70px] flex justify-center items-center text-3xl capitalize font-bold border-2 border-white"
    }>{renderCurrentGuessChar() || renderPreviousGuessChar()}</div>
  )
}