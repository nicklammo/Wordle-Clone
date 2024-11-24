import { useMemo } from "react";
import GridTile from "./grid-tile";

export default function GridRow({
  rowIndex
}: {
  rowIndex: number;
}) {
  const renderColumn = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => (
      <GridTile key={i} columnIndex={i} rowIndex={rowIndex} />
    ));
  }, [rowIndex]);

  return (
    <div className="mb-1.5 flex flex-row justify-center gap-1.5">
      {renderColumn}
    </div>
  )
}