import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
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

interface InstructorProfileProps {
  instructorId: string;
}

const InstructorProfile: React.FC<InstructorProfileProps> = ({ instructorId }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reservations');

        if (response.status !== 200) {
          throw new Error('Response not ok');
        }

        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleSelectReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  const handleMarkAsResponsibility = async () => {
    if (selectedReservation) {
      try {
        const response = await fetch(`/api/instructors/${instructorId}/reservations/${selectedReservation._id}`, {
          method: 'PUT',
        });

        if (response.ok) {
          const updatedReservations = reservations.map((reservation) => {
            if (reservation._id === selectedReservation._id) {
              return { ...reservation, instructorId: instructorId };
            }
            return reservation;
          });

          setReservations(updatedReservations);
          setSelectedReservation(null);
        } else {
          console.error('Failed to mark reservation as responsibility');
        }
      } catch (error) {
        console.error('Error marking reservation as responsibility:', error);
      }
    }
  };

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
              {reservation.instructorId === instructorId ? (
                <Text color="green.500">Responsibility: Yours</Text>
              ) : (
                <Button
                colorScheme={reservation.instructorId === instructorId ? "green" : "blue"}
                onClick={() => handleSelectReservation(reservation)}>
                  Mark as Responsibility
                </Button>
              )}
            </Flex>
          </Box>
        ))}
      </Flex>
    </List>
    {selectedReservation && (
      <Box my={4}>
          <Text fontWeight="bold">Selected Reservation:</Text>
          <Text>{selectedReservation.activity}</Text>
          <Text>{selectedReservation.firstName} {selectedReservation.lastName}</Text>
          <Text>Date: {selectedReservation.date}</Text>
          <Text>Time: {selectedReservation.time}</Text>
          <Button colorScheme="blue" onClick={handleMarkAsResponsibility}>
            Mark as Responsibility
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default InstructorProfile;
