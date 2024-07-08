import { ReactNode } from "react";
import { cn } from "../../utils/cn";

function AppContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center px-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default AppContainer;
