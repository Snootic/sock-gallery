import type React from "react";
import './index.css'
import type { Host } from "../../types";

type SelectProps = {
  values: Host[]
  selectedValue: Host['address'] | undefined
  setSelectedvalue: React.Dispatch<React.SetStateAction<Host['address'] | undefined>>
}

export const GameSelect: React.FC<SelectProps> = (props) => {
  return (
    <div className="select">
      {props.values.map((host) => (
        <div key={host.address} className="option">
          {host.name} [{host.address}]
        </div>
      ))}
    </div>
  )
}