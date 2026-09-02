import type { ReactNode } from "react"

interface Tabs{
    children: ReactNode[];
}

const Tabs = ({children}: Tabs) => {
  return (
    <div>
        <div className="mx-auto w-full border-b border-gray-200">
            <div role="tablist" className="-mb-px flex gap-4">
                {children}
            </div>
        </div>
    </div>
  )
}

export default Tabs
