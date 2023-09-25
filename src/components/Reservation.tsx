import { useState, ChangeEvent, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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
    status: 'not confirmed', // Set default status here
  });

  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight to ignore time differences

    const selectedDate = new Date(formData.date);
    selectedDate.setHours(0, 0, 0, 0);

    const selectedTime = new Date(`1970-01-01T${formData.time}`);
    const startTime = new Date(`1970-01-01T05:00:00`);
    const endTime = new Date(`1970-01-01T19:00:00`);

    setDateError('');
    setTimeError('');

    if (selectedDate <= currentDate) {
      setDateError('Please select a date at least one days after the current date.');
      return;
    }

    if (selectedTime < startTime || selectedTime > endTime) {
      setTimeError('Please select a time between 05:00 and 19:00.');
      return;
    }

    try {
      // Add the status field to your formData object
      const formDataWithStatus = {
        ...formData,
        status: 'not confirmed', // Set the initial status as 'not confirmed' or any other default value you prefer
      };

      const response = await fetch('http://localhost:3000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithStatus), // Send the updated formData object
      });

      if (response.ok) {
        // Reservation created successfully
        console.log('Reservation created!');
        toast.success('Reservation submitted! Wait for a call from the instructor to confirm and talk about details', {
          position: 'top-right', // Customize notification position
          autoClose: 5000, // Set auto-close duration in milliseconds
        });
        // Reset the form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          activity: '',
          date: '',
          time: '',
          status: '',
        });
      } else {
        // Error in creating the reservation
        console.error('Failed to create reservation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

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
                <FormControl isRequired isInvalid={!!dateError}>
                  <FormLabel>Date</FormLabel>
                  <InputGroup>
                    <Input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <FormErrorMessage>{dateError}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!timeError}>
                  <FormLabel>Time</FormLabel>
                  <InputGroup>
                    <Input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <FormErrorMessage>{timeError}</FormErrorMessage>
                </FormControl>
                <HStack spacing={20}>
                  <Button
                    colorScheme="blue"
                    bg="blue.400"
                    color="white"
                    _hover={{ bg: 'blue.500' }}
                    type="submit"
                  >
                    Confirm
                  </Button>
                  <Button
                    colorScheme="red"
                    bg="red.900"
                    color="white"
                    _hover={{ bg: 'red' }}
                    type="submit"
                    onClick={() =>
                      toast.info("You can call us on our numbers for more information! you can find them in home page ", {
                        position: "top-right", // Customize notification position
                        autoClose: 40000, // Set auto-close duration in milliseconds (40 seconds)
                        hideProgressBar: true, // Hide the progress bar
                        closeOnClick: true, // Close the notification when clicked
                        pauseOnHover: true, // Pause the timer when hovered
                        draggable: true, // Make the notification draggable
                      })
                    }
                  >
                    get more informations

                  </Button>
                </HStack>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
