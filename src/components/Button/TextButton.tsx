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
  color?:
    | "primary"
    | "secondary"
    | "neutral"
    | "success"
    | "error"
    | "warning"
    | "white";
  loading?: boolean;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export function TextButton(props: ButtonProps) {
  const {
    loading,
    color,
    size,
    fullWidth,
    type,
    children,
    className,
  } = props;

  const classes = cn(
    className,
    "rounded-md p-3 transition-all duration-150 hover:bg-others-btn-hover-overlay active:bg-others-btn-active-overlay",
    {
      "text-primary": color === "primary",
      "text-white": color === "white",
      "text-red-500 hover:bg-red-100": color === "error",
      "text-neutral-600": color === "neutral",
      "!p-1 text-xsmall": size === "small",
      "w-full": fullWidth,
    }
  );

  const loadingClasses = cn(
    "animate-spin inline-block w-4 h-4 border-[2.5px] border-current border-t-transparent text-neutral-50 rounded-full"
  );

  return (
    <button {...props} type={type} className={classes} disabled={!!loading}>
      <div className="space-x-2 flex items-center">
        {loading && (
          <div className={loadingClasses} role="status" aria-label="loading">
            <span className="sr-only">Loading</span>
          </div>
        )}
        <Typography color="inherit" weight="bold" whiteSpaceNoWrap>
          {children}
        </Typography>
      </div>
    </button>
  );
}
