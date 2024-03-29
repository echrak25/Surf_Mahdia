import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  List,
  Text,
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
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
  status: string;
  numberOfPeople: number;
}

const activityOptions = ['paddle', 'surf', 'kitesurf'];

const InstructorProfile: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedReservation, setEditedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reservations');

        if (response.status !== 200) {
          throw new Error('Response not ok');
        }

        const reservationsData: Reservation[] = response.data;

        setReservations(reservationsData);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [reservations]);

  const applyStatusFilter = () => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    if (!statusFilter) {
      return reservations.filter((reservation) => {
        const reservationDate = new Date(`${reservation.date}T${reservation.time}`);
        return reservationDate >= threeMonthsAgo;
      });
    }

    return reservations.filter((reservation) => {
      const reservationDate = new Date(`${reservation.date}T${reservation.time}`);
      return reservation.status === statusFilter && reservationDate >= threeMonthsAgo;
    });
  };

  const compareReservations = (a: Reservation, b: Reservation) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  };

  const sortedReservations = applyStatusFilter().slice().sort(compareReservations);
  const filteredReservations = applyStatusFilter();

  const handleConfirmReservation = async (reservationId: string) => {
    try {
      await axios.put(`http://localhost:3000/api/reservations/${reservationId}`, {
        status: 'confirmed',
      });

      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === reservationId
            ? { ...reservation, status: 'confirmed' }
            : reservation
        )
      );
    } catch (error) {
      console.error('Error confirming reservation:', error);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      await axios.put(`http://localhost:3000/api/reservations/${reservationId}`, {
        status: 'cancelled',
      });

      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === reservationId
            ? { ...reservation, status: 'cancelled' }
            : reservation
        )
      );
    } catch (error) {
      console.error('Error cancelling reservation:', error);
    }
  };

  const openEditModal = (reservation: Reservation) => {
    setEditedReservation(reservation);
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setEditedReservation(null);
    setIsEditing(false);
  };

  const handleSaveEditedReservation = async () => {
    if (editedReservation) {
      if (editedReservation.status === 'not confirmed') {
        try {
          // Make an API call to update the reservation with the edited data
          const response = await axios.put(
            `http://localhost:3000/api/reservations/${editedReservation._id}`,
            {
              firstName: editedReservation.firstName,
              lastName: editedReservation.lastName,
              activity: selectedActivity || editedReservation.activity,
              date: editedReservation.date,
              time: editedReservation.time,
              numberOfPeople: editedReservation.numberOfPeople,
              status: editedReservation.status,
            }
          );

          if (response.status === 200) {
            // Update the local state with the edited reservation
            setReservations((prevReservations) =>
              prevReservations.map((reservation) =>
                reservation._id === editedReservation._id ? editedReservation : reservation
              )
            );

            // Close the modal
            setIsEditing(false);
          } else {
            console.error('Error updating reservation:', response.data.error);
          }
        } catch (error) {
          console.error('Error updating reservation:', error);
        }
      }
    }
  };


  return (
    <Flex direction="column" align="center">
      <Heading as="h1" size="xl" my={4}>
        Instructors Profile
      </Heading>
      <Flex justify="center" mb={4}>
        <Select
          placeholder="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="not confirmed">Not Confirmed</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </Select>
      </Flex>
      <List>
        <Flex wrap="wrap" justify="center">
          {sortedReservations.map((reservation) => (
            <Box key={reservation._id} className="reservation-item" p={4} m={2} borderWidth="1px" borderRadius="md">
              <Flex direction="column" align="center">
                <Text fontWeight="bold">{reservation.activity}</Text>
                <Text>{reservation.firstName} {reservation.lastName}</Text>
                <Text>Number of People: {reservation.numberOfPeople}</Text>
                <Text>Date: {reservation.date}</Text>
                <Text>Time: {reservation.time}</Text>
                <Text fontWeight="bold">Status: <span style={{ color: reservation.status === 'cancelled' ? 'red' : reservation.status === 'confirmed' ? 'green' : 'yellow' }}>{reservation.status}</span></Text>
                <Flex mt={2}>
                  <Button
                    colorScheme={reservation.status === 'not confirmed' ? 'green' : 'gray'}
                    onClick={() => handleConfirmReservation(reservation._id)}
                    mr={2}
                    disabled={reservation.status !== 'not confirmed'}
                  >
                    Confirm
                  </Button>
                  <Button
                    colorScheme={reservation.status === 'not confirmed' ? 'red' : 'gray'}
                    onClick={() => handleCancelReservation(reservation._id)}
                    mr={2}
                    disabled={reservation.status !== 'not confirmed'}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      if (reservation.status === 'not confirmed') {
                        openEditModal(reservation); // Open edit modal
                      }
                    }}
                    disabled={reservation.status !== 'not confirmed'}
                  >
                    Modify
                  </Button>

                </Flex>
              </Flex>
            </Box>
          ))}
        </Flex>
      </List>

      <Modal isOpen={isEditing} onClose={handleCloseEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Reservation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editedReservation && (
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={editedReservation.firstName}
                  onChange={(e) =>
                    setEditedReservation({ ...editedReservation, firstName: e.target.value })
                  }
                />
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={editedReservation.lastName}
                  onChange={(e) =>
                    setEditedReservation({ ...editedReservation, lastName: e.target.value })
                  }
                />
                <FormLabel>Activity</FormLabel>
                <Select
                  value={selectedActivity || editedReservation?.activity}
                  onChange={(e) => setSelectedActivity(e.target.value)}
                >
                  {activityOptions.map((activity) => (
                    <option key={activity} value={activity}>
                      {activity}
                    </option>
                  ))}
                </Select>

                <FormLabel>Number of People</FormLabel>
                <Input
                  type="number"
                  value={editedReservation?.numberOfPeople || ''}
                  onChange={(e) =>
                    setEditedReservation({
                      ...editedReservation,
                      numberOfPeople: parseInt(e.target.value) || 0,
                    })
                  }
                />

                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={editedReservation.date}
                  onChange={(e) =>
                    setEditedReservation({ ...editedReservation, date: e.target.value })
                  }
                />
                <FormLabel>Time</FormLabel>
                <Input
                  type="time"
                  value={editedReservation.time}
                  onChange={(e) =>
                    setEditedReservation({ ...editedReservation, time: e.target.value })
                  }
                />
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveEditedReservation}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCloseEditModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default InstructorProfile;
