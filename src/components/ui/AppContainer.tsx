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
        "absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export default AppContainer;
