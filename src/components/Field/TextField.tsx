import cn from "classnames";
import {Typography} from "@saesx/components/Typography";

export interface Props {
  name: string
  label: string
  type?: "text" | "password"
  helperText?: string
  error?: boolean
  Icon?: React.ReactNode
}

export function TextField(props: Props) {
  const { name, label, type, helperText, error, Icon } = props

  const helperTextClasses = cn("text-neutral-500", {
    "text-red-600": error
  })

  return (
    <div>
      <label htmlFor={name} className="block mb-2">
        <Typography size="small" weight="bold">
          {label}
        </Typography>
      </label>

      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
          aria-describedby="email-error"
        />

        {Icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
            {Icon}
          </div>
        )}
      </div>

      {helperText && <Typography size="xxsmall" className="mt-2" color={error ? "text-red-600" : "text-neutral-500"}>{helperText}</Typography> }
    </div>
  )
}