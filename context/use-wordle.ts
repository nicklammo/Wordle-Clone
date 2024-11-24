import { useContext } from "react";
import WordleContext from "./wordle-context";

export default function useWordle() {
  return useContext(WordleContext);
}