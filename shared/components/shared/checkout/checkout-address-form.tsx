import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {WhiteBlock} from "@/shared/components/shared/white-block"
import {AddressInput} from "@/shared/components/shared/address-input"
import {FormTextArea} from "@/shared/components/shared/form/form-text-area"
import {ErrorText} from "@/shared/components/shared/error-text"

interface Props {
    className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({className = ''}) => {
    const {control} = useFormContext()

    return (
        <WhiteBlock title={'3. Адрес доставки'} className={className}>
            <div className={'flex flex-col gap-5'}>
                <Controller
                    render={({field, fieldState}) =>
                        <>
                            <AddressInput onChange={field.onChange}/>
                            {fieldState.error && <ErrorText text={fieldState.error.message as string} />}
                        </>
                }
                    name={'address'}
                    control={control}

                />


                <FormTextArea
                    name={'comment'}
                    className={'text-base'}
                    rows={5}
                />
            </div>
        </WhiteBlock>
    )
}

