import type { WordleContext } from "./context/wordle-context";

export default function charactersFn (word: string) {
  return word.split("").reduce((chars, char, i) => {
    if (!chars[char]) {
      chars[char] = {
        positions: [i],
      }
    } else {
      chars[char].positions.push(i);
    }
    return chars;
  }, {} as WordleContext["characters"])
}