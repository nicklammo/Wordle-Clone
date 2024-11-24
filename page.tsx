"use client";
import { useEffect } from "react";
import Grid from "./components/grid";
import WordleProvider from "./context/wordle-provider";
import randomWord from "./random-word";

export default function WordlePage() {
  useEffect(() => {
    document.body.classList.add("bg-[#e494ad]");

    return () => document.body.classList.remove("bg-[#e494ad]");
  }, []);

  return (
    <WordleProvider initialSolution={randomWord()}>
      <Grid />
    </WordleProvider>
  )
}