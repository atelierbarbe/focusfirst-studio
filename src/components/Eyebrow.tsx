export default function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-8 ${light ? "bg-white/40" : "bg-dark-gray/40"}`} />
      <span
        className={`font-mono text-xs uppercase tracking-wider ${
          light ? "text-white/70" : "text-dark-gray"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
