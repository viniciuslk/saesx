import cn from "classnames";
import Link from "next/link";

interface Props {
  active: boolean
  href: string
  title: string
}

export function TabItem({ active, href, title }: Props) {
  const classes = cn("py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-primary-20", {
    "border-primary text-primary font-bold": active
  })

  return (
    <Link href={href} className={classes}>
      {title}
    </Link>
  )
}