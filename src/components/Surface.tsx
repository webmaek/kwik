import clsx from "clsx";

export function Surface({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-md bg-gray-800 p-4 shadow-md",
        className ? className : ""
      )}
    >
      {children}
    </div>
  );
}
