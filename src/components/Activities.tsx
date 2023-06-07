import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { FcAssistant } from 'react-icons/fc';

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
}

function Activities(props: CardProps) {
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Flex align={'center'} justify={'center'}>
        <Stack direction="column" align="center" spacing={2}>
          <Flex
            w={16}
            h={16}
            align={'center'}
            justify={'center'}
            color={useColorModeValue('gray.100', 'gray.700')}
            rounded={'full'}
            bg={useColorModeValue('gray.100', 'gray.700')}
          >
            {props.icon}
          </Flex>
          <Box mt={2} textAlign="center">
  <Heading size="md" mb={1}>
    {props.heading}
  </Heading>
  <Text fontSize="sm">
    {props.description}
  </Text>
</Box>

          <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
            Learn more
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Activities;
