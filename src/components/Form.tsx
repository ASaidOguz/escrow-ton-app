import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Textarea
  } from '@chakra-ui/react'

  interface FormProps {
    arbiter:string
    beneficiary:string
    value:string
    job_description:string
    setArbiter: (arbiter: string) => void;
    setBeneficiary: (beneficiary: string) => void;
    setValue: (value: string) => void;
    setJob_description:(job_description:string)=>void
  }
export default function Form(props:FormProps) {
  const handleArbiterChange=(e: { target: { value: string } })=>props.setArbiter(e.target.value);
  const handleBeneficiaryChange=(e:{target:{value:string}})=>props.setBeneficiary(e.target.value);
  const handleValueChange=(e:{target:{value:string}})=>props.setValue(e.target.value)
  const handleJDescriptionChange=(e:{target:{value:string}})=>props.setJob_description(e.target.value)
  return (
    <FormControl>
    <FormLabel fontWeight="bold">Arbiter</FormLabel>
    <Input type='text'  onChange={handleArbiterChange}/>
    <FormHelperText fontWeight="bold">Please insert your arbiter's Address</FormHelperText>
    <FormLabel fontWeight="bold">Beneficiary</FormLabel>
    <Input type='text'  onChange={handleBeneficiaryChange} />
    <FormHelperText fontWeight="bold">Please insert your beneficiary's Address</FormHelperText>
    <FormLabel fontWeight="bold">Value</FormLabel>
    <Input type='text'  onChange={handleValueChange}/>
    <FormHelperText fontWeight="bold">Please insert desired value in TON (Minimum Amount is 1.55 Ton)</FormHelperText>
    <FormLabel fontWeight="bold">Job Description</FormLabel>
        <Textarea  size="sm" resize="vertical" onChange={handleJDescriptionChange} />
        <FormHelperText fontWeight="bold">Please insert your Job description</FormHelperText>
    </FormControl>
  )
}
