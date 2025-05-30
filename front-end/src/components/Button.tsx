import React, { ReactElement } from 'react'

type variants= "primary" | "secondary"

interface buttonProps{
    variant:variants,
    size:"sm"|"md"|"lg"|"xl",
    text:string,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    onClick?:()=>void
}

function Button(props:buttonProps) {
    const variantStyles={
        "primary":"bg-purple-600 text-white",
        "secondary":"bg-purple-300 text-purple-600",
    }

    const sizeStyles={
        "sm":"p-2 py-1",
        "md":"p-4 py-2",
        "lg":"p-6 py-3",
        "xl":"px-28 py-3"
    }

    const defaultStyles="rounded-md  flex items-center m-1 cursor-pointer"

  return (
        <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${defaultStyles}`}><span className='mr-2'>{props.startIcon}</span>
        {props.text} {props.endIcon}</button>
  )
}

export default Button