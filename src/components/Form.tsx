import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
  } from '@chakra-ui/react'

  interface FormProps {
    arbiter:string
    beneficiary:string
    value:string
    setArbiter: (arbiter: string) => void;
    setBeneficiary: (beneficiary: string) => void;
    setValue: (value: string) => void;
  }
export default function Form(props:FormProps) {
  const handleArbiterChange=(e: { target: { value: string } })=>props.setArbiter(e.target.value);
  const handleBeneficiaryChange=(e:{target:{value:string}})=>props.setBeneficiary(e.target.value);
  const handleValueChange=(e:{target:{value:string}})=>props.setValue(e.target.value)

    


  return (
    <FormControl>
    <FormLabel>Arbiter</FormLabel>
    <Input type='text'  onChange={handleArbiterChange}/>
    <FormHelperText>Please insert your arbiter's Address</FormHelperText>
    <FormLabel>Beneficiary</FormLabel>
    <Input type='text'  onChange={handleBeneficiaryChange} />
    <FormHelperText>Please insert your beneficiary's Address</FormHelperText>
    <FormLabel>Value</FormLabel>
    <Input type='text'  onChange={handleValueChange}/>
    <FormHelperText>Please insert desired value in TON</FormHelperText>
    </FormControl>
  )
}
