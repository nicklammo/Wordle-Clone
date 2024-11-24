export default function ColourGuide() {
  return (
    <div className="absolute bottom-0 right-0 px-4 py-2 grid grid-cols-[20px_auto] gap-3 mx-auto my-[15px] text-sm font-bold items-center text-black text-opacity-30">
      <div className="w-[24px] h-[24px] bg-[#e02e8c] border border-white text-xs flex text-white font-bold justify-center items-center" >W</div>
      <div><strong>W</strong> is in the word and in the correct spot.</div>
      <div className="w-[24px] h-[24px] bg-[#ea7fb3] border border-white text-xs flex text-white font-bold justify-center items-center" >I</div>
      <div><strong>I</strong> is in the word but in the wrong spot.</div>
      <div className="w-[24px] h-[24px] border border-white text-xs flex text-white font-bold justify-center items-center" >F</div>
      <div><strong>F</strong> is not in the word in any spot.</div>
    </div>
  );
}