import React from 'react'
import { Card, CardHeader, CardBody, CardFooter,Text,Skeleton,CircularProgress,Textarea,Stack,Box, StackDivider, Heading } from '@chakra-ui/react'

export default function InfoCard() {
  return (
    <Card mb={4} mr={4}>
    <CardHeader>
      <Heading size='md'>How to use Escrow-Ton</Heading>
    </CardHeader>
  
    <CardBody>
      <Stack divider={<StackDivider />} spacing='4'>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Step 1
          </Heading>
          <Text pt='2' fontSize='sm'>
            Connect your wallet
          </Text>
        </Box>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Step 2
          </Heading>
          <Text pt='2' fontSize='sm'>
            Add your Selected arbiter and beneficiar addresses
          </Text>
        </Box>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Step 3
          </Heading>
          <Text pt='2' fontSize='sm'>
            Add your prefered value and job description for to be done by beneficiary
          </Text>
        </Box>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Deployment
          </Heading>
          <Text pt='2' fontSize='sm'>
            After the fields is filled your contract address will be calculated automatically and just simply click on deploy and confirm
            your deployment via Tonkeeper
          </Text>
        </Box>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Wait for Deployment
          </Heading>
          <Text pt='2' fontSize='sm'>
            Wait for 10-20 second to be deployment complete and you can check your contract's status in explorer if you desire to
          </Text>
        </Box>
      </Stack>
    </CardBody>
  </Card>
  )
}
