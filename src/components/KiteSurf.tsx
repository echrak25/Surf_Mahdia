import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';


export default function KiteSurf() {
  const img = require("../assets/ki.jpg");
  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={
              img
            }
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              Kitesurf
            </Heading>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}
              >
                ite surfing is an absolute thrill – imagine harnessing the wind's power to skim across the water, your kite soaring above. It's a rush of adrenaline, a dance with nature, and a passport to adventure. Whether you're a beginner or a seasoned water enthusiast, kite surfing promises an unforgettable experience and a sense of freedom like no other. Join us, ride the wind, and let the sea set you free!
              </Text>
            </VStack>

            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Price:
                  </Text>{' '}
                  150 dt
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Duration:
                  </Text>{' '}
                  2H
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Number Max:
                  </Text>{' '}
                  8 persons
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Our phoneNumber:
                  </Text>{' '}
                  +216 99 273 375
                </ListItem>
              </List>
            </Box>
          </Stack>
          <Button
            as={Link}
            to="/reservation"
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            Reservation
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
