import './Switch.module.css'
import React from 'react'

const Switch = ({ onChange, defaultChecked = false }) => {
  const [checked, setChecked] = React.useState(defaultChecked)
  const toggle = () => {
    if (onChange) onChange(!checked)
    setChecked(!checked)
  }
  return (
    <div
      className={`w-16 h-10 flex items-center shadow-md rounded-full p-1 ${
        checked ? 'bg-green' : 'bg-gray-300'
      }`}
      onClick={toggle}
    >
      <div
        className={`bg-white w-8 h-8 rounded-full shadow-md transform duration-100 ease-in-out ${
          checked && 'translate-x-6'
        }`}
      />
    </div>
  )
}

export default Switch
