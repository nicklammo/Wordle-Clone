import words from "./words";

export default function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
