interface TooltipProps {
  text: string;
  align?: "left" | "right" | "top";
}

export function Tooltip({ text, align = "right" }: TooltipProps) {
  const position =
    align === "top"
      ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
      : align === "left"
      ? "right-full mr-2 top-1/2 -translate-y-1/2"
      : "left-full ml-2 top-1/2 -translate-y-1/2";

  return (
    <span className="relative inline-flex items-center group">
      {/* ℹ️ ICON */}
      <span
        className="cursor-help text-xs text-muted-foreground select-none"
        aria-label="More info"
      >
        ⓘ
      </span>

      {/* TOOLTIP */}
      <span
        className={`
          pointer-events-none absolute z-50
          ${position}
          hidden group-hover:block
          w-56 rounded-lg bg-black text-white
          text-xs p-2 shadow-xl
          animate-fade-in
        `}
        role="tooltip"
      >
        {text}
      </span>
    </span>
  );
}
