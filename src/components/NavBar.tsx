
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  FormControl,FormLabel,Input,InputGroup,HStack,InputRightElement,Box,useColorMode,Flex,Text,IconButton,Button,Stack,Collapse,Link,useColorModeValue,useDisclosure,Heading,Checkbox,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, chakra,} from '@chakra-ui/react';
  import { useState } from 'react';
  import { CloseIcon, HamburgerIcon , ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { NavLink as RouterLink} from 'react-router-dom';
  export default function NavBar(){
    const logo=require('../assets/logof.png')
    const { isOpen,onOpen,onToggle } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const {  isOpen:isOpenSignin, onOpen:onOpenSignin,onClose: onCloseSignin, } = useDisclosure();
    const { isOpen:isOpenSignup, onOpen:onOpenSignup, onClose:onCloseSignup, } = useDisclosure();
    const [showPassword, setShowPassword] = useState(false);
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
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          
          </Flex>

          <Flex flex={{ base: 1 }}justify={{ base: 'start', md: 'center' }}>
 
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
          
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'} 
            spacing={6}>
            <Button onClick={onOpenSignin}
            color={'blue.400'}
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}
              fontFamily={"cursive"}>
              Sign In
            </Button>
            <Modal isOpen={isOpenSignin} onClose={onCloseSignin}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign in</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy our services you need to sign in ! </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
          </ModalBody>

          <ModalFooter>
            <Button bgColor={'blue.100'} mr={3} onClick={onCloseSignin}>
              Close
            </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
            <Button onClick={onOpenSignup}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'blue.400'}
             
              _hover={{
                bg: 'blue.300',
              }}>
              Sign Up
            </Button>
            <Modal isOpen={isOpenSignup} onClose={onCloseSignup}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign UP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>

          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy our services you need to sign Up !
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
          </ModalBody>
          <ModalFooter>
            <Button bgColor={'blue.200'} mr={3} onClick={onCloseSignup}>
              Close
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
          </Stack>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  interface NavItem {
    label: string;
    href: string;
  }
  
  const NAV_ITEMS: Array<NavItem> = [
    {

      label: 'Packs',
      href:'/Packs'

    },
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
  
