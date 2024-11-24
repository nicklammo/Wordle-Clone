"use client";
import { useEffect, useMemo } from "react";
import useWordle from "../context/use-wordle";
import GridRow from "./grid-row";
import Keyboard from "./keyboard";
import ColourGuide from "./colour-guide";

export default function Grid() {
  const { ...state } = useWordle();

  const renderGrid = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => (
      <GridRow key={i} rowIndex={i} />
    ));
  }, []);

  return (
    <div className="antialiased">
      <ColourGuide />
      <div className="mx-auto my-[60px] flex w-min flex-col">
        {renderGrid}
        <Keyboard />
        <div className="my-1 flex justify-center rounded bg-[#ea7fb3] px-2 py-1 text-sm font-bold text-black text-opacity-40 shadow-md">
          <span>SOLVED: {state.solvedCount}</span>
        </div>
      </div>
    </div>
  )
}