import React from "react"
import './index.css'

type buttonProps = {
  text: string
  event: () => void
}

export const Button: React.FC<buttonProps> = (props) => {
  return (
    <button 
      onClick={props.event}
      className="button"
    >
      <p>{props.text}</p>
    </button>
  )
}