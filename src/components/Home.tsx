import { Container, Box, Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { Heading, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import About from "./About";
import Activities from "./Activities";
import { GiWaveSurfer,GiPaddles,GiPaperBoat } from 'react-icons/gi';
function Home() {
  const img =  require("../assets/DSC_0504.jpg");
  return (
    <>
      <Flex
        w="full"
        h="70vh"
        backgroundImage={img}
        backgroundSize="cover"
        backgroundPosition="center center"
        justifyContent="center"
        alignItems="center"
      >
        <VStack
          w="full"
          h="200px"
          justify="center"
          px={useBreakpointValue({ base: 4, md: 10 })}
          bgGradient="linear(to-r, blackAlpha.600, transparent)"
          textAlign="center"
          spacing={6}
        >
          <Text
            color="white"
            fontWeight={600}
            lineHeight={10}
            fontSize={{ base: 'xl', md: '4xl' }}
            fontFamily="Cairo, serif"
          >
            "Mahdia: Where the sky meets the sea, and kitesurfers soar with absolute glee."
          </Text>
          <Stack direction="row" align="center">
            <Button
             as={Link} 
             to="/reservation" 
              bg="blue.400"
              rounded="full"
              color="white"
              _hover={{ bg: 'blue.800' }}
            >
              Make Reservation
            </Button>
            <Button
            as={Link} 
            to="/Pricing" 
              bg="whiteAlpha.300"
              rounded="full"
              color="white"
              _hover={{ bg: 'whiteAlpha.500' }}
            >
              Show me more
            </Button>
          </Stack>
        </VStack>
      </Flex>
      <About />
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight="bold">
            Our Activities
          </Heading>
          <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
            "Unleash your inner adventurer with our activities!"
          </Text>
        </Stack>
        <Container maxW={'5xl'} mt={12}>
          <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Activities link="/kitesurf" heading={"kitesurf"} description={"Riding a board while being pulled by a kite"} icon={<Icon as={GiWaveSurfer} w={10} h={10} color="blue.400" />} />
          <Activities link="/Stand-up-paddle" heading={"Stand-up Paddle"} description={"Standing on a board and paddling"} icon={<Icon as={GiPaddles} w={10} h={10} color="blue.400" />} />
          <Activities link="/kayak" heading={"kayack"} description={"Paddling a small boat on water."} icon={<Icon as={GiPaperBoat} w={10} h={10} color="blue.400" />} />

          </Flex>
        </Container>
      </Box>
      <Box p={8} bg="blue.800">
        <Container maxW="xl">
          <VStack spacing={4} align="center">
          <Heading size="xl" color="blue.200">Contact Us</Heading>
            <Text  size="lg">
              Have questions or want to learn more? Dont hesitate to Contact us !
            </Text>
            <Text fontWeight="bold">Mahdia Kayaks : 20040801</Text>
<Text fontWeight="bold">Paddle kitesurf tunisia : 99273375</Text>

          </VStack>
        </Container>
      </Box>
    </>
  );
}

export default Home;
