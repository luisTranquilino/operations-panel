import { twMerge } from "tailwind-merge";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={twMerge(
        "bg-white border border-slate-200 rounded-2xl shadow-md p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
