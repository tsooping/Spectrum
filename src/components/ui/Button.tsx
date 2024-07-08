import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full bg-white/10 text-lg font-bold backdrop-blur-2xl sm:text-base xl:text-lg",
        className,
      )}
      {...rest} // Spread all other props to the button element
    >
      {children}
    </button>
  );
}

export default Button;
