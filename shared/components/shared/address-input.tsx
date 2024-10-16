'use client'

import React from 'react'
import {AddressSuggestions} from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
    onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({onChange}) => {
    return (
        <AddressSuggestions
            token={'c9657f915962e180b63ba5683b71ff7e6ab652e4'}
            onChange={(data) => onChange?.(data?.value)}
        />
    )
}