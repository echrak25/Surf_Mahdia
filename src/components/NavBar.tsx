
import React, { useState, useEffect } from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  useDisclosure,
  Collapse,
  IconButton,
  Link,
  useColorMode,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons';
import { NavLink as RouterLink } from 'react-router-dom';
import axios from 'axios';


  export default function NavBar() {
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const { isOpen, onOpen, onToggle } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen: isOpenSignin, onOpen: onOpenSignin, onClose: onCloseSignin } = useDisclosure();
    const [showPassword, setShowPassword] = useState(false);
    const [loggedInInstructor, setLoggedInInstructor] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
  interface Instructor {
    _id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/instructors');
        if (response.status === 200) {
          setInstructors(response.data);
        }
      } catch (error) {
        console.log(instructors);
        console.error('Error fetching instructors:', error);
      }
    };
  
    fetchInstructors();
  }, []);
  
  const handleLogin = async () => {
    try {
      const loggedInInstructor = instructors.find((instructor) => instructor.email === email && instructor.password === password);
   if (loggedInInstructor) {
        setLoggedIn(true);
        setLoggedInInstructor(true);
        window.location.href = '/instructors/profile'
        onCloseSignin();
      } else {
        setLoginError('Invalid email or password'); // Set error message
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.100', 'gray.100')}
        align={'center'}>
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'center' }}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
          <Button
            onClick={onOpenSignin}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'blue.300',
            }}>
            Sign In
          </Button>


          
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
      </Flex>
      
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>

      <Modal isOpen={isOpenSignin} onClose={onCloseSignin}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign in</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Sign in form */}
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Stack direction="row" spacing={2}>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
                mt={1}
              />
            </Stack>
  {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
              
            </FormControl>
          
    <Button
      bg={'blue.400'}
      color={'white'}
      _hover={{
        bg: 'blue.500',
      }}
      onClick={handleLogin}
    >
      Sign in
    </Button>
          </ModalBody>
          <ModalFooter>
            <Button bgColor={'blue.100'} mr={3} onClick={onCloseSignin}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

  interface NavItem {
    label: string;
    href: string;
  }
  
  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Pricing',
      href: '/Pricing',
      
    },
    {
      label: 'KiteSurf',
      href: '/KiteSurf',
    },
    {
      label: 'Stand-up-paddle ',
      href: '/Stand-up-paddle ',
    },
    {
      label: 'kayak',
      href: '/Kayak',
      
    },
    
    {
      label: 'Home',
      href: '/',
    },
  ];

  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'white');
    const linkHoverColor = useColorModeValue('blue.400', 'blue.100');
  
    return (
      <Stack direction="row" spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Link
              as={RouterLink}
              to={navItem.href as string}
              color={linkColor}
              _hover={{
                color: linkHoverColor,
                textDecoration: 'underline',
              }}
            >
              {navItem.label}
            </Link>
          </Box>
        ))}
      </Stack>
    );
  };

<>
  <DesktopNav />
  </>
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={onToggle}>
        <Flex
          py={2}
          as={Link}
          link={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
            color: useColorModeValue('blue.400', 'blue.400')
          }}>
             <RouterLink 
                to={href }
            color={useColorModeValue('gray.600', 'gray.200')}
              >{label}</RouterLink>
        </Flex>
      </Stack>
    );
  };
  
