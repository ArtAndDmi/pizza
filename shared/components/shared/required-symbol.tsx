import React from "react"

export const RequiredSymbol: React.FC = ({className = ''}) => {
    return (
        <span className={'text-red-500'}>*</span>
    )
}

