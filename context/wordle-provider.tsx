"use client";
import { use, useCallback, useEffect, useState } from "react";
import WordleContext, { WordleContext as WordleContextType } from "./wordle-context";
import randomWord from "../random-word";
import charactersFn from "../characters-fn";

export default function WordleProvider({
  children,
  initialSolution,
}: {
  children: React.ReactNode | React.ReactNode[];
  initialSolution: string;
}) {
  const defaultValues = use(WordleContext);
  const [state, setState] = useState<Omit<WordleContextType, "setState">>({
    ...defaultValues,
    solution: initialSolution,
    characters: charactersFn(initialSolution),
    solvedCount: 0,
  });

  const resetBoard = useCallback(() => {
    const solution = randomWord();
    const characters = charactersFn(solution);
    setState((s) => ({ ...s, guesses: [], characters, solution, currentGuess: "" }));
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key.match(/^[a-z,A-Z]$/) && state.currentGuess.length < 5) {
        setState((s) => ({ ...s, currentGuess: s.currentGuess + event.key }));
      }

      if (event.key === "Backspace" && state.currentGuess.length > 0) {
        setState((s) => ({ ...s, currentGuess: s.currentGuess.slice(0, -1) }));
      }

      if (event.key === "Enter" && state.currentGuess.length === 5) {
        setState((s) => ({ ...s, guesses: [...s.guesses, s.currentGuess.toLocaleLowerCase()] }));
        setState((s) => ({ ...s, currentGuess: "" }));
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [state.currentGuess, setState]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (state.guesses[state.guesses.length - 1] === state.solution || state.guesses.length === 6) {
      timeout = setTimeout(() => resetBoard(), 1000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [resetBoard, state.currentGuess, state.guesses, state.solution]);

  useEffect(() => {
    if (state.guesses[state.guesses.length - 1] === state.solution) {
      setState((s) => ({ ...s, solvedCount: s.solvedCount + 1 }));
    }
  }, [state.guesses, state.solution]);

  useEffect(() => {
    if (localStorage.getItem("solvedCount")) {
      const solvedCount = localStorage.getItem("solvedCount");
      if (solvedCount !== null) {
        setState((s) => ({ ...s, solvedCount: parseInt(solvedCount, 10) }));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("solvedCount", state.solvedCount.toString());
  }, [state.solvedCount]);

  return (
    <WordleContext.Provider value={{ ...state, setState }}>
      {children}
    </WordleContext.Provider>
  )
}