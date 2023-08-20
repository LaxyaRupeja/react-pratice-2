import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Heading,
  Input,
  Select,
  Spinner,
  VStack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TripCard from "./components/TripCard";
// import { findAllByTestId } from "@testing-library/react";
function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [trips, setTrips] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [noOfTravelers, setNnOfTravelers] = useState(0);
  const [budgetPerPerson, setBudgetPerPerson] = useState(0);
  const [isLoading,setIsLoading] = useState(true)
  const [sort,setSort] = useState("");
  const [filter,setFilter] = useState("");
  const toast = useToast();
  function loadDataToDom(url){
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTrips(data.trips);
      });
  }
  useEffect(() => {
    loadDataToDom("https://muddy-gray-girdle.cyclic.cloud/trips");
  }, []);
  function handleSort(e){
    setSort(e.target.value);
    if(filter){
    loadDataToDom(`https://muddy-gray-girdle.cyclic.cloud/trips?filter=${filter}&sort=${e.target.value}`)
    }
    else{
    loadDataToDom(`https://muddy-gray-girdle.cyclic.cloud/trips?sort=${e.target.value}`)
    }
  }
  function handleFilter(e){
    setFilter(e.target.value);
    if(sort){
      loadDataToDom(`https://muddy-gray-girdle.cyclic.cloud/trips?filter=${e.target.value}&sort=${sort}`)
      }
      else{
      loadDataToDom(`https://muddy-gray-girdle.cyclic.cloud/trips?filter=${e.target.value}`)
      }
  }
  function handleFormSubmit() {
    setIsLoading(false)
    const obj = {
      name,
      email,
      destination,
      noOfTravelers,
      budgetPerPerson,
    };
    fetch("https://muddy-gray-girdle.cyclic.cloud/trips", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true)
        toast({
          title: "Data Posted",
          description: "Trip data is successfully posted",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        loadDataToDom("https://muddy-gray-girdle.cyclic.cloud/trips");
        setName("");
        setEmail("");
        setDestination("");
        setNnOfTravelers(0);
        setBudgetPerPerson(0);
        console.log(data);
      });
  }
  return (
    <VStack>
      <Heading size={"2xl"} my={4}>Plan My Trip</Heading>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
      </Button>
      <Divider />
      
      <Box boxShadow={"md"} w="50%" p="4" borderRadius={"md"} mt={4}>
        <Heading mb={2}>Post Data</Heading>
        <Divider />
        <FormControl mt={2}>
          <FormLabel>Name</FormLabel>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
          />
          <FormLabel>Email address</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
          <FormLabel>Category</FormLabel>
          <Select
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Select Category"
            value={destination}
          >
            <option value="India">India</option>
            <option value="Europe">Europe</option>
            <option value="America">America</option>
            <option value="Africa">Africa</option>
          </Select>
          <FormLabel>No. of Travelers</FormLabel>
          <Input
            type="number"
            value={noOfTravelers}
            onChange={(e) => setNnOfTravelers(e.target.value)}
          />
          <FormLabel>Budget Per Person</FormLabel>
          <Input
            type="number"
            value={budgetPerPerson}
            onChange={(e) => setBudgetPerPerson(e.target.value)}
            step={100}
          />

       { isLoading ? (  <Button
            onClick={handleFormSubmit}
            mt={4}
            colorScheme="teal"
            variant="solid"
            type="submit"
          >
            POST
          </Button>):
          (
          <Spinner
        mt={4}
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='teal.500'
  size='xl'
/>
)
}
        </FormControl>
      </Box>
      <Divider />
      <Box w={"93%"}>
        <Heading textAlign={"center"} size={"2xl"} mb={4} mt={3}>Trips</Heading>
        <Divider />
        <HStack mt={4} mb={4}>
        <Select onChange={(e)=>handleFilter(e)} placeholder='Filter by Destination'>
        <option value="India">India</option>
            <option value="Europe">Europe</option>
            <option value="America">America</option>
            <option value="Africa">Africa</option>
</Select>
<Select onChange={(e)=>handleSort(e)} placeholder='Sort by Budget'>
  <option value='asc'>Low to High</option>
  <option value='desc'>High to Low</option>
</Select>
        </HStack>
        <Grid mt={4} templateColumns="repeat(3, 1fr)" gap={4}>
          {trips.map((trip) => (
            <TripCard
            uniqueKey={trip._id}
              name={trip.name}
              email={trip.email}
              budget={trip.budgetPerPerson}
              noOfTravel={trip.noOfTravelers}
              destination={trip.destination}
              loadDataToDom={loadDataToDom}
            />
          ))}
        </Grid>
      </Box>
    </VStack>
  );
}

export default App;
