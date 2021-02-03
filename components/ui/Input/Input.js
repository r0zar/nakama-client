import React from 'react'
import cn from 'classnames'
import s from './Input.module.css'

const Input = (props) => {
  const { className, children, onChange, onBlur, ...rest } = props

  const rootClassName = cn(s.root, {}, className)

  const handleOnChange = (e) => {
    console.log(e)
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }

  const handleOnBlur = (e) => {
    if (onBlur) {
      onBlur(e.target.value)
    }
    return null
  }

  return (
    <label>
      <input
        className={rootClassName}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </label>
  )
}

export default Input
