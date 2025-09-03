import type React from "react";
import './index.css'
import type { Host } from "../../types";

type SelectProps = {
  values: Host[]
  selectedValue: Host
  setSelectedvalue: React.Dispatch<React.SetStateAction<string>>
}

export const Select: React.FC<SelectProps> = (props) => {
  return (
    <select className='select' value={props.selectedValue.address}/>
  )
}