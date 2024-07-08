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
        "rounded-full bg-white/10 text-2xl font-bold backdrop-blur-2xl xl:text-lg",
        className,
      )}
      {...rest} // Spread all other props to the button element
    >
      {children}
    </button>
  );
}

export default Button;
