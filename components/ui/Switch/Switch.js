import cn from 'classnames'
import s from './Switch.module.css'
import React from 'react'

const Switch = ({ onChange, defaultChecked = false }) => {
  const [checked, setChecked] = React.useState(defaultChecked)
  const toggle = () => {
    if (onChange) onChange(!checked)
    setChecked(!checked)
  }

  const rootClassName = cn(
    s.root,
    'w-24 flex items-center shadow-md rounded-sm p-1 transform duration-700 ease-in-out bg-gray-600 bg-opacity-25',
    checked ? 'bg-green glow' : ''
  )

  return (
    <button className={rootClassName} onClick={toggle}>
      <div
        className={`text-gray-900 bg-black flex justify-center align-middle w-8 h-full rounded-sm shadow-md transform duration-200 ease-out ${
          checked ? 'translate-x-14 ' : ''
        }`}
      >
        <i
          className={`fas fa-${
            checked ? 'bolt text-gray-300' : 'power-off text-gray-400'
          } self-center  transform duration-1000 ease-out`}
        ></i>
      </div>
    </button>
  )
}

export default Switch
