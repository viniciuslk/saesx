import cn from 'classnames'

interface Props {
  className?: string
}

export function CardWrapper({ className, ...props}: React.PropsWithChildren<Props>) {
  const classes = cn(className, "w-full shadow-lg rounded-lg overflow-hidden bg-white")

  return (
    <div {...props}  className={classes} />
  )
}