import { Icon } from '@chakra-ui/icon';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Textarea,
    Tooltip,
    useClipboard,
    useColorModeValue,
    VStack,
  } from '@chakra-ui/react';

  import {BsPerson } from 'react-icons/bs';
  import { IoIosMail ,IoMdCall} from "react-icons/io";

  
  export default function Reservation() {

    return (
      <Flex
        bg={useColorModeValue('gray.100', 'gray.900')}
        align="center"
        justify="center"
        id="contact">
        <Box
          borderRadius="lg"
          width="7200px"
          m={{ base: 5, md: 16, lg: 10 }}
          p={{ base: 5, lg: 16 }}>
          <Box>
            <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
              <Heading
                fontSize={{
                  base: '2xl',
                  md: '3xl',
                }}>
                "Get your Reservation"
              </Heading>
  
              <Stack
                spacing={{ base: 4, md: 8, lg: 20 }}
                direction={{ base: 'column', md: 'row' }}>
                
  
                <Box
                  bg={useColorModeValue('white', 'gray.700')}
                  borderRadius="lg"
                  p={50}
                  color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                  shadow="base">
                  <VStack spacing={5}>
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
  
                      <InputGroup>
                        <InputLeftElement children={<BsPerson />} />
                        <Input type="text" name="Firstname" placeholder="Your FirstName" />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>LastName</FormLabel>
  
                      <InputGroup>
                        <InputLeftElement children={<BsPerson />} />
                        <Input type="text" name="LastName" placeholder="Your LastName" />
                      </InputGroup>
                    </FormControl>
  
                    <FormControl isRequired>
                      <FormLabel >Email</FormLabel>
  
                      <InputGroup>
                        <InputLeftElement children={<IoIosMail />} />
                        <Input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>PhoneNumber</FormLabel>
  
                      <InputGroup>
                        <InputLeftElement children={<IoMdCall />} />
                        <Input type="number" name="Number" placeholder="Your PhoneNumber" />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Activities</FormLabel>
  
                      <InputGroup>
                        <InputLeftElement />
                        <Input type="activity" name="activity" placeholder="choose your Activity" />
                      </InputGroup>
                    </FormControl>
                
  
                    <FormControl isRequired>
                      <FormLabel>Date</FormLabel>
                      <InputGroup>
                        <InputLeftElement />
                        <Input name="date" type="date"/>

                      </InputGroup>
  
                      
                      
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Time</FormLabel>
                      <InputGroup>
                        <InputLeftElement  />
                        <Input name="time" type="time"/>

                      </InputGroup>
  
                      
                      
                    </FormControl>
  
  
                    <Button
                      colorScheme="blue"
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                        Confirm
                    </Button>
                  </VStack>
                </Box>
              </Stack>
            </VStack>
          </Box>
        </Box>
      </Flex>
    );
  }