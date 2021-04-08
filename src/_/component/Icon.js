import React from 'react'

export const Icon = ({ name, family = 'fa', size, color, className = '', ...props }) => {
    props.className = `${family} ${family}-${name} ${family}-${size} text-${color} ${className}`
    return (
        <i {...props}></i>
    )
}
