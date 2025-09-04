import React from "react"
import './index.css'

type buttonProps = {
  text: string
  event: () => void
  size?: string
}

export const Button: React.FC<buttonProps> = (props) => {
  return (
    <button
      onClick={props.event}
      className="button"
      style={{width: props.size ?? "100%"}}
    >
      <p>{props.text}</p>
    </button>
  )
}