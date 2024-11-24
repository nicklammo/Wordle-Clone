"use client";
import KeyboardTile from "./keyboard-tile";
import KeyboardTileNonChar from "./keyboard-tile-non-char";
import BackspaceIcon from "../icons/backspace.svg";
import Image from "next/image";
import KeyboardRow from "./keyboard-row";
import { useMemo } from "react";
import useWordle from "../context/use-wordle";

export default function Keyboard() {
  const state = useWordle();

  const firstRowChars = useMemo(() => "qwertyuiop".split("").map((char) => (
    <KeyboardTile key={char} char={char} />
  )), []);
  const secondRowChars = useMemo(() => "asdfghjkl".split("").map((char) => (
    <KeyboardTile key={char} char={char} />
  )), []);
  const thirdRowChars = useMemo(() => "zxcvbnm".split("").map((char) => (
    <KeyboardTile key={char} char={char} />
  )), []);

  return (
    <div className="my-[30px] flex flex-col text-xl font-bold capitalize *:mb-1.5">
      <KeyboardRow>{firstRowChars}</KeyboardRow>
      <KeyboardRow>{secondRowChars}</KeyboardRow>
      <KeyboardRow>
        <KeyboardTileNonChar element={`ENTER`} onClick={() => {
          if (state.currentGuess.length === 5) {
            state.setState((s) => ({ ...s, guesses: [...s.guesses, s.currentGuess] }));
            state.setState((s) => ({ ...s, currentGuess: "" }));
          }
        }} />
        {thirdRowChars}
        <KeyboardTileNonChar element={<Image src={BackspaceIcon} alt="" width={28} />} onClick={() => {
          if (state.currentGuess.length > 0) {
            state.setState((s) => ({ ...s, currentGuess: s.currentGuess.slice(0, -1) }));
          }
        }} />
      </KeyboardRow>
    </div>
  )
}