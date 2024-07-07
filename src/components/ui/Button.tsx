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
        "rounded-full backdrop-blur-2xl bg-white/10 text-2xl font-bold",
        className
      )}
      {...rest} // Spread all other props to the button element
    >
      {children}
    </button>
  );
}

export default Button;
