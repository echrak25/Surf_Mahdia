import { NavLink } from 'react-router-dom';
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
function Home() {
  return (
    <Flex
    w={'full'}
    h={'40vh'}
    backgroundImage={
      'url(https://media.istockphoto.com/id/1208148708/photo/polka-dot-summer-brown-dress-suede-wedge-sandals-eco-straw-tote-bag-cosmetics-on-a-light.jpg?s=612x612&w=0&k=20&c=9Y135GYKHLlPotGIfynBbMPhXNbYeuDuFzreL_nfDE8=)'
    }
    backgroundSize={'cover'}
    backgroundPosition={'center center'}>
    <VStack
      w={'full'}
      justify={'center'}
      px={useBreakpointValue({ base: 4, md: 8 })}
      bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
      <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
        <Text
          color={'white'}
          fontWeight={700}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
        .... </Text>
        <Stack direction={'row'}>
          <Button
            bg={'blue.400'}
            rounded={'full'}
            color={'white'}
            _hover={{ bg: 'blue.800' }}>
           Show me more
          </Button>
          <Button
            bg={'whiteAlpha.300'}
            rounded={'full'}
            color={'white'}
            _hover={{ bg: 'whiteAlpha.500' }}>
            Show me more
          </Button>
        </Stack>
      </Stack>
    </VStack>
  </Flex>
  )
}

export default Home