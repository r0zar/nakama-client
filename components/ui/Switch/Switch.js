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
      className={`w-24 flex items-center shadow-md rounded-sm p-1 transform duration-700 ease-in-out ${
        checked ? 'bg-green glow' : 'bg-gray-300'
      }`}
      onClick={toggle}
    >
      <div
        className={`text-gray-900 flex justify-center align-middle bg-white w-8 h-full rounded-sm shadow-md transform duration-200 ease-out ${
          checked && 'translate-x-14'
        }`}
      >
        <i
          className={`fas fa-${
            checked ? 'bolt text-gray-900' : 'power-off'
          } self-center text-gray-300 transform duration-1000 ease-out`}
        ></i>
      </div>
    </div>
  )
}

export default Switch
