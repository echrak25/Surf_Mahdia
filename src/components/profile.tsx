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
        const response = await fetch('http://localhost:3001/api/reservations');
        
        if (!response.ok) {
          throw new Error('Response not ok');
        }
    
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []); // Empty dependency array to fetch data only once

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
          // Update the reservations list
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
        {reservations.map((reservation) => (
          <ListItem key={reservation._id}>
            <Flex justify="space-between" align="center">
              <Box>
                <Text>{reservation.firstName} {reservation.lastName}</Text>
                <Text>{reservation.activity}</Text>
                <Text>{reservation.date} {reservation.time}</Text>
              </Box>
              {reservation.instructorId === instructorId ? (
                <Text>Responsibility: Yours</Text>
              ) : (
                <Button
                  colorScheme="blue"
                  onClick={() => handleSelectReservation(reservation)}
                >
                  Mark as Responsibility
                </Button>
              )}
            </Flex>
          </ListItem>
        ))}
      </List>
      {selectedReservation && (
        <Box my={4}>
          <Text>Selected Reservation:</Text>
          <Text>{selectedReservation.firstName} {selectedReservation.lastName}</Text>
          <Text>{selectedReservation.activity}</Text>
          <Text>{selectedReservation.date} {selectedReservation.time}</Text>
          <Button colorScheme="blue" onClick={handleMarkAsResponsibility}>
            Mark as Responsibility
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default InstructorProfile;
