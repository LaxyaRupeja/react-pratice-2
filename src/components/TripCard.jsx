import { Box, Button, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from '@chakra-ui/react'
import React from 'react'
import { useToast } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
const TripCard = ({ name, destination, noOfTravel, budget, email, uniqueKey, loadDataToDom }) => {
  const toast = useToast()
  function handleDelete() {
    fetch(`https://muddy-gray-girdle.cyclic.cloud/trips/${uniqueKey}`, {
      method: "DELETE"
    }).then((res) => res.json()).then((data) => {
      toast({
        title: "Data Deleted",
        description: "Trip data is successfully Deleted",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      loadDataToDom("https://muddy-gray-girdle.cyclic.cloud/trips")
      console.log(data)
    })
  }
  return (
    <Card key={uniqueKey}>
      <CardHeader>
        <Heading size='lg'><span style={{ color: "teal" }}>Name</span> : {name}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='2'>
          <Box>
            <Heading color='teal' size='md' textTransform='uppercase'>
              Email Address
            </Heading>
            <Text pt='2' fontSize='lg'>
              {email}
            </Text>
          </Box>
          <Box>
            <Heading color='teal' size='md' textTransform='uppercase'>
              Destination
            </Heading>
            <Text pt='2' fontSize='lg'>
              {destination}
            </Text>
          </Box>
          <Box>
            <Heading color='teal' size='md' textTransform='uppercase'>
              No-Of-Travelers
            </Heading>
            <Text pt='2' fontSize='lg'>
              {noOfTravel}
            </Text>
          </Box>
          <Box>
            <Heading color='teal' size='md' textTransform='uppercase'>
              Budget-Per-Person
            </Heading>
            <Text pt='2' fontSize='lg'>
              ₹{budget}
            </Text>
          </Box>
        </Stack>
        <Button
          onClick={handleDelete}
          mt={4}
          colorScheme="red"
          variant="solid"
        >
          <DeleteIcon mr={2} />
          DELETE
        </Button>
      </CardBody>
    </Card>
  )
}

export default TripCard