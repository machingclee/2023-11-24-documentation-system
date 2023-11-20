import { HTMLAttributes } from "react"

const Spacer = ({
  height = 20,
  width = 20,
  ...props
}: {
  height?: number,
  width?: number
} & HTMLAttributes<HTMLDivElement>) => {
  return <div style={{ height, width }} {...props}></div>
}

export default Spacer