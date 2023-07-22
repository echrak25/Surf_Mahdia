import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  VStack,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { IoIosMail, IoMdCall } from 'react-icons/io';

export default function Reservation() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    activity: '',
    date: '',
    time: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reservation created successfully
        console.log('Reservation created!');
        // Reset the form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          activity: '',
          date: '',
          time: '',
        });
      } else {
        // Error in creating the reservation
        console.error('Failed to create reservation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Flex align="center" justify="center" id="contact">
      <Box borderRadius="lg" width="720px" m={{ base: 5, md: 16, lg: 10 }} p={{ base: 5, lg: 16 }}>
        <Box>
          <VStack spacing={8}>
            <Heading fontSize={{ base: '2xl', md: '3xl' }}>
              "Get your Reservation"
            </Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={5} align="start">
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement children={<BsPerson />} />
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="Your FirstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>LastName</FormLabel>
                  <InputGroup>
                    <InputLeftElement children={<BsPerson />} />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Your LastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement children={<IoIosMail />} />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>PhoneNumber</FormLabel>
                  <InputGroup>
                    <InputLeftElement children={<IoMdCall />} />
                    <Input
                      type="number"
                      name="phoneNumber"
                      placeholder="Your PhoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Activities</FormLabel>
                  <Select
                    name="activity"
                    placeholder="Choose your Activity"
                    value={formData.activity}
                    onChange={handleSelectChange}
                  >
                    <option value="surf">Surf</option>
                    <option value="paddle">Paddle</option>
                    <option value="kayak">Kayak</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <InputGroup>
                    <Input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Time</FormLabel>
                  <InputGroup>
                    <Input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  colorScheme="blue"
                  bg="blue.400"
                  color="white"
                  _hover={{ bg: 'blue.500' }}
                  type="submit"
                >
                  Confirm
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
