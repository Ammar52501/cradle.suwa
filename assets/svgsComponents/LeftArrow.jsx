import React from 'react'

const LeftArrow = ({ stroke = "#83A4B8", className = "" }) => {
  return (
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8.00009 2L2.7072 7.29289C2.31668 7.68342 2.31668 8.31658 2.7072 8.70711L8.00009 14" stroke={stroke} stroke-width="3" stroke-linecap="round" />
    </svg>

  )
}

export default LeftArrow