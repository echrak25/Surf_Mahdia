import { Container, Box, Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { Heading, Icon } from '@chakra-ui/react';
import About from "./About";
import Reservation from "./Reservation";
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
              bg="blue.400"
              rounded="full"
              color="white"
              _hover={{ bg: 'blue.800' }}
            >
              Make Reservation
            </Button>
            <Button
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
          <Activities heading={"kitesurf"} description={"Riding a board while being pulled by a kite"} icon={<Icon as={GiWaveSurfer} w={10} h={10} color="blue.400" />} />
          <Activities heading={"Stand-up Paddle"} description={"Standing on a board and paddling"} icon={<Icon as={GiPaddles} w={10} h={10} color="blue.400" />} />
          <Activities heading={"kayack"} description={"Paddling a small boat on water."} icon={<Icon as={GiPaperBoat} w={10} h={10} color="blue.400" />} />

          </Flex>
        </Container>
      </Box>
      
    </>
  );
}

export default Home;
