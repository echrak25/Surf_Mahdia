import { ReactNode } from 'react';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import {  FaInstagram, FaFacebook } from 'react-icons/fa';



const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('blue.700', 'blue.200')}>
      <Container as={Stack} maxW={'8xl'}  py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
  
            <Link href={'https://www.google.com/maps/place/Paddle+Mahdia/@35.5045453,11.063163,16z/data=!4m6!3m5!1s0x13022362534bccb9:0xf910e873338e1650!8m2!3d35.5045453!4d11.0693348!16s%2Fg%2F11t9cv7688?hl=en-US&entry=ttu'}>Map</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Install App </ListHeader>
            <Link href={'https://play.google.com/store/apps/details?id=com.swisscontact.mahdia.guide'}>Android</Link>
            <Link href={'https://apps.apple.com/it/app/mahdia-guide/id1600727648?l=en'}>Apple</Link>
            
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
         <Container
      as={Stack}
      maxW={'8xl'}
      py={4}
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      justify={{ md: 'space-between' }}
      align={{ md: 'center' }}
      h={20} >
          <Text>© 2023 Mahdia Paddle. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Facebook'} href={'https://www.facebook.com/p/MahdiaPaddleKitesurf-100064056634363/'}>
              <FaFacebook />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'https://www.instagram.com/paddle.kitesurf.mahdia/'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}