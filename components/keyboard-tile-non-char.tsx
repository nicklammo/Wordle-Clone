export default function KeyboardTileNonChar({
  element,
  onClick,
}: {
  element: React.ReactNode;
  onClick?: () => void;
}) {
  return <div onClick={onClick} className={`flex justify-center items-center rounded px-4 py-3 bg-black bg-opacity-10 text-sm cursor-pointer`}>{element}</div>;
}