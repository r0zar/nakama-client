import cn from 'classnames'
import React from 'react'
import _ from 'lodash'

const Dropdown = ({ defaultSelection, onChange }) => {
  const options = {
    message: 'User posts a message',
    enter: 'User enters the server'
  }
  const [hideDropdown, setHideDropdown] = React.useState(true)
  const [selection, setSelection] = React.useState(
    options[defaultSelection] || 'this happens in Discord'
  )
  const handleEventSourceSelection = (e) => {
    setSelection(e.target.text)
    setHideDropdown(!hideDropdown)
    onChange(e.target.value)
  }
  return (
    <div className="relative inline-block text-left w-full">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setHideDropdown(!hideDropdown)}
        >
          When {selection}...
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className={cn(
          'origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5',
          { invisible: hideDropdown }
        )}
      >
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {_.map(options, (option, key) => {
            return (
              <option
                key={key}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                role="menuitem"
                value="message"
                onClick={handleEventSourceSelection}
              >
                {option}
              </option>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dropdown
