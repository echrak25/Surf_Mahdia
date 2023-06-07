import { NavLink } from 'react-router-dom';
import { Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react';

function Home() {
  return (
    <Flex
      w="full"
      h="70vh"
      backgroundImage="url(https://mahdiasurf.com/.cm4all/mediadb/DSC_0504.jpg)"
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
  );


}

export default Home;
