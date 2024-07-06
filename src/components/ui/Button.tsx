import { ReactNode } from "react";
import { cn } from "../../utils/cn";

function Button({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "rounded-full backdrop-blur-2xl bg-white/10 text-2xl font-bold",
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
