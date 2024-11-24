export default function KeyboardRow({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-row gap-1.5 justify-center">{children}</div>;
}