import { Typography } from "../Typography";
import cn from "classnames";

interface ButtonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "prefix"
  > {
  variant?: "solid" | "outlined";
  color?:
    | "primary"
    | "secondary"
    | "neutral"
    | "success"
    | "error"
    | "warning"
    | "white";
  loading?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
}

export function Button({
  variant = "solid",
  color = "primary",
  type = "button",
  loading,
  children,
  rounded,
  disabled,
  size = "medium",
  fullWidth = false,
  ...props
}: ButtonProps) {
  const classes = cn(
    "rounded-md px-3 py-3 transition-all duration-150 shadow-sm",
    {
      "bg-primary text-neutral-800 hover:bg-primary-20 active:bg-primary-60":
        variant === "solid" && color === "primary",
      "bg-secondary text-white hover:bg-secondary-20 active:bg-secondary-60":
        variant === "solid" && color === "secondary",
      "bg-white text-neutral-600 hover:bg-neutral-50 active:bg-neutral-100":
        variant === "solid" && color === "white",
      "bg-neutral-50 text-neutral-800 hover:bg-neutral-100 active:bg-neutral-300 border border-neutral-200":
        variant === "outlined" && color === "neutral",
      "bg-feedback-success text-white hover:opacity-80":
        variant === "solid" && color === "success",
      "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:bg-neutral-300":
        variant === "solid" && color === "neutral",
      "bg-feedback-error text-white hover:bg-feedback-error active:bg-feedback-error":
        variant === "solid" && color === "error",
      "opacity-50 cursor-not-allowed": variant === "solid" && loading,
      "rounded-full": rounded,
      "!p-1 text-xsmall": size === "small",
      "w-full": fullWidth,
    }
  );

  const loadingClasses = cn(
    "animate-spin inline-block w-4 h-4 border-[2.5px] border-current border-t-transparent rounded-full"
  );

  return (
    <button {...props} type={type} className={classes} disabled={!!loading}>
      <div className="space-x-2 flex items-center justify-center">
        {loading && (
          <div className={loadingClasses} role="status" aria-label="loading">
            <span className="sr-only">Loading</span>
          </div>
        )}
        <Typography color="inherit" weight="semibold" whiteSpaceNoWrap>
          {children}
        </Typography>
      </div>
    </button>
  );
}
