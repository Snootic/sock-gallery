import React from "react"
import './index.css'

type InputProps = {
  placeholder: string;
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="input"
      value={props.value}
      onChange={e => props.setValue(e.target.value)}
      placeholder={props.placeholder}
    />
  )
}