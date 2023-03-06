import clsx from "clsx";

export function Divider({ className }: { className?: string }) {
  return (
    <div className={clsx("relative", className ?? "")}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-600" />
      </div>
    </div>
  );
}
