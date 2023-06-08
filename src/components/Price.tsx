
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { currencyFormatter } from '../currencyFormatter';
interface CardProps {
  price: string;
  name: string;
  duration : string;
  description: string[];
}

export default function Pricing(props: CardProps) {
  const Price1 = Number(props.price); 
  return (
    <Center py={6}>
      <Box
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}
        >
          <Text
            fontSize={'sm'}
            fontWeight={500}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            px={3}
            color={'white.500'}
            rounded={'full'}
          >
            {props.name}
          </Text>
          <Stack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'3xl'} fontWeight={800}>
              {currencyFormatter.format(Price1)}
            </Text>
            <Text color={'gray.500'}>/{props.duration}h</Text>
          </Stack>
        </Stack>
        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
          <List spacing={3}>
            {props.description.map((item, index) => (
              <ListItem key={index}>
                <ListIcon as={CheckIcon} color="blue.400" />
                {item}
              </ListItem>
            ))}
          </List>

          <Button
            mt={10}
            w={'full'}
            bg={'blue.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
          >
            Make a reservation
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
