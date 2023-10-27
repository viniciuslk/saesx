import React from "react";

export function TabWrapper(props: React.PropsWithChildren) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 w-full">
      <nav className="-mb-0.5 flex justify-center space-x-6" aria-label="Tabs" role="tablist">
        {props.children}
      </nav>
    </div>
  )
}