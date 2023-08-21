import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  List,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';

interface Reservation {
  _id: string;
  firstName: string;
  lastName: string;
  activity: string;
  date: string;
  time: string;
  instructorId: string;
}

const InstructorProfile: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reservations');

        if (response.status !== 200) {
          throw new Error('Response not ok');
        }

        // Sort reservations by date and time
        const sortedReservations = response.data.sort((a: Reservation, b: Reservation) => {
          const dateComparison = a.date.localeCompare(b.date);
          if (dateComparison !== 0) {
            return dateComparison;
          }
          return a.time.localeCompare(b.time);
        });

        setReservations(sortedReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <Flex direction="column" align="center">
      <Heading as="h1" size="xl" my={4}>
        Instructor Profile
      </Heading>
      <List>
        <Flex wrap="wrap" justify="center">
          {reservations.map((reservation) => (
            <Box key={reservation._id} className="reservation-item" p={4} m={2} borderWidth="1px" borderRadius="md">
              <Flex direction="column" align="center">
                <Text fontWeight="bold">{reservation.activity}</Text>
                <Text>{reservation.firstName} {reservation.lastName}</Text>
                <Text>Date: {reservation.date}</Text>
                <Text>Time: {reservation.time}</Text>
              </Flex>
            </Box>
          ))}
        </Flex>
      </List>
    </Flex>
  );
};

export default InstructorProfile;
