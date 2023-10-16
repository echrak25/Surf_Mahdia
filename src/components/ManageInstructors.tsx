import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
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
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Instructor {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const ManageInstructors: React.FC = () => {
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isNewInstructorModalOpen, setIsNewInstructorModalOpen] = useState<boolean>(false);
    const [editedInstructor, setEditedInstructor] = useState<Instructor | null>(null);
    const [newInstructor, setNewInstructor] = useState<Partial<Instructor>>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/instructors');

                if (response.status !== 200) {
                    throw new Error('Response not ok');
                }

                const instructorsData: Instructor[] = response.data;
                setInstructors(instructorsData);
            } catch (error) {
                console.error('Error fetching instructors:', error);
            }
        };

        fetchInstructors();
    }, [instructors]);

    const openEditModal = (instructor: Instructor) => {
        setEditedInstructor(instructor);
        setIsEditing(true);
    };

    const handleCloseEditModal = () => {
        setEditedInstructor(null);
        setIsEditing(false);
    };

    const handleSaveEditedInstructor = async () => {
        if (editedInstructor) {
            try {
                // Make an API call to update the instructor with the edited data
                const response = await axios.put(
                    `http://localhost:3000/api/instructors/${editedInstructor._id}`,
                    {
                        firstName: editedInstructor.firstName,
                        lastName: editedInstructor.lastName,
                        email: editedInstructor.email,
                        password: editedInstructor.password,
                    }
                );

                if (response.status === 200) {
                    // Update the local state with the edited instructor
                    setInstructors((prevInstructors) =>
                        prevInstructors.map((instructor) =>
                            instructor._id === editedInstructor._id ? editedInstructor : instructor
                        )
                    );

                    // Close the modal
                    setIsEditing(false);
                } else {
                    console.error('Error updating instructor:', response.data.error);
                }
            } catch (error) {
                console.error('Error updating instructor:', error);
            }
        }
    };

    const handleNewInstructor = async () => {
        try {
            // Make an API call to create a new instructor with the newInstructor data
            const response = await axios.post('http://localhost:3000/api/instructors', newInstructor);

            if (response.status === 201) {
                // Add the new instructor to the local state
                const newInstructorData = response.data;

                // Use the functional form of setInstructors to ensure the latest state
                setInstructors((prevInstructors) => [...prevInstructors, newInstructorData]);

                // Close the modal
                setIsNewInstructorModalOpen(false);

                // Clear the input fields
                setNewInstructor({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                });
            } else {
                console.error('Error creating instructor:', response.data.error);
            }
        } catch (error) {
            console.error('Error creating instructor:', error);
        }
    };


    const handleEditInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof Instructor
    ) => {
        if (editedInstructor) {
            setEditedInstructor({
                ...editedInstructor,
                [field]: e.target.value,
            });
        }
    };

    const handleDeleteInstructor = async (instructorId: string) => {
        try {
            // Make an API call to delete the instructor
            const response = await axios.delete(`http://localhost:3000/api/instructors/${instructorId}`);

            if (response.status === 200) {
                toast.success("an instructor is deleted ", {
                    position: "top-right", // Customize notification position
                    autoClose: 10000, // Set auto-close duration in milliseconds (40 seconds)
                    hideProgressBar: true, // Hide the progress bar
                    closeOnClick: true, // Close the notification when clicked
                    pauseOnHover: true, // Pause the timer when hovered
                    draggable: true, // Make the notification draggable
                })
                // Remove the deleted instructor from the local state
                setInstructors((prevInstructors) =>
                    prevInstructors.filter((instructor) => instructor._id !== instructorId)
                );
            } else {
                console.error('Error deleting instructor:', response.data.error);
                toast.success("an instructor is deleted ", {
                    position: "top-right", // Customize notification position
                    autoClose: 10000, // Set auto-close duration in milliseconds (40 seconds)
                    hideProgressBar: true, // Hide the progress bar
                    closeOnClick: true, // Close the notification when clicked
                    pauseOnHover: true, // Pause the timer when hovered
                    draggable: true, // Make the notification draggable
                })
            }
        } catch (error) {
            console.error('Error deleting instructor:', error);
        }
    };

    const handleNewInstructorInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof Instructor
    ) => {
        setNewInstructor({
            ...newInstructor,
            [field]: e.target.value,
        });
    };

    return (
        <Flex direction="column" align="center">
            <Heading as="h1" size="xl" my={4}>
                Manage Instructors
            </Heading>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Password</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {instructors.map((instructor) => (
                        <Tr key={instructor._id}>
                            <Td>
                                {instructor.firstName} {instructor.lastName}
                            </Td>
                            <Td>{instructor.email}</Td>
                            <Td>{instructor.password}</Td>
                            <Td>
                                <Button
                                    marginRight={4}
                                    colorScheme="blue"
                                    onClick={() => openEditModal(instructor)}
                                >
                                    Modify
                                </Button>
                                <Button
                                    colorScheme="red"
                                    onClick={() => handleDeleteInstructor(instructor._id)}
                                >
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Button
                colorScheme="green"
                mt={4}
                onClick={() => setIsNewInstructorModalOpen(true)}
            >
                Add New Instructor
            </Button>

            <Modal isOpen={isEditing} onClose={handleCloseEditModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Instructor</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {editedInstructor && (
                            <FormControl>
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    type="text"
                                    value={editedInstructor.firstName}
                                    onChange={(e) => handleEditInputChange(e, 'firstName')}
                                />
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    type="text"
                                    value={editedInstructor.lastName}
                                    onChange={(e) => handleEditInputChange(e, 'lastName')}
                                />
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={editedInstructor.email}
                                    onChange={(e) => handleEditInputChange(e, 'email')}
                                />
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={editedInstructor.password}
                                    onChange={(e) => handleEditInputChange(e, 'password')}
                                />
                            </FormControl>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleSaveEditedInstructor}>
                            Save
                        </Button>
                        <Button colorScheme="gray" onClick={handleCloseEditModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isNewInstructorModalOpen}
                onClose={() => setIsNewInstructorModalOpen(false)}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Instructor</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text"
                                value={newInstructor.firstName || ''}
                                onChange={(e) => handleNewInstructorInputChange(e, 'firstName')}
                            />
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="text"
                                value={newInstructor.lastName || ''}
                                onChange={(e) => handleNewInstructorInputChange(e, 'lastName')}
                            />
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={newInstructor.email || ''}
                                onChange={(e) => handleNewInstructorInputChange(e, 'email')}
                            />
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={newInstructor.password || ''}
                                onChange={(e) => handleNewInstructorInputChange(e, 'password')}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" onClick={handleNewInstructor} marginRight={2}>
                            Save
                        </Button>
                        <Button
                            colorScheme="gray"
                            onClick={() => setIsNewInstructorModalOpen(false)}
                        >
                            Cancel
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default ManageInstructors;
