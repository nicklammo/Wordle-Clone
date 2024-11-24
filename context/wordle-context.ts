import { createContext, Dispatch, SetStateAction } from "react";

export type WordleContext = {
  characters: Record<string, { positions: number[] }>;
  currentGuess: string;
  guesses: string[];
  setState: Dispatch<SetStateAction<Omit<WordleContext, "setState">>>;
  solution: string;
  solvedCount: number;
}

export default createContext<WordleContext>({
  characters: {},
  currentGuess: "",
  guesses: [],
  setState: () => {},
  solution: "",
  solvedCount: 0,
});