import React from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  useColorModeValue,
  Container,
  VStack,
} from '@chakra-ui/react';
function About() {
  return (
    <Container maxW={'7xl'} p="12">
    <Heading as="h1">About us</Heading>
    <Box
      marginTop={{ base: '1', sm: '5' }}
      display="flex"
      flexDirection={{ base: 'column', sm: 'row' }}
      justifyContent="space-between">
      <Box
        display="flex"
        flex="1"
        marginRight="3"
        position="relative"
        alignItems="center">
        <Box
          width={{ base: '100%', sm: '85%' }}
          zIndex="2"
          marginLeft={{ base: '0', sm: '5%' }}
          marginTop="5%">
          <Image
              borderRadius="lg"
              src={
                'https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/310469648_491512756327275_8249089173187587568_n.jpg?stp=dst-jpg_s960x960&_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=oQu1JxRUkCoAX99ByQL&_nc_ht=scontent.ftun16-1.fna&oh=00_AfAVGm4WVUKZ8rXYv9bZwKUDlnRA0Bx_2zl-GVLPwFHbsg&oe=648630C5'
              }
              alt="team photo"
              objectFit="contain"
              
            />
        </Box>
        <Box zIndex="1" width="100%" position="absolute" height="100%">
          <Box
            bgGradient={useColorModeValue(
              'radial(blue.600 1px, transparent 1px)',
              'radial(blue.300 1px, transparent 1px)'
            )}
            backgroundSize="20px 20px"
            opacity="0.4"
            height="100%"
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: '3', sm: '0' }}>
      
        <Text
        fontWeight={600}
          as="p"
          marginTop="2"
          color={useColorModeValue('gray.700', 'gray.200')}
          fontSize="lg"
          >
          We are an extraordinary team of young professionals, united by an unwavering passion for nature and an insatiable addiction to the sea. Our childhoods were filled with exhilarating adventures, playing amidst the crashing waves and exploring the enchanting depths of Mahdia's sub-sea world. Now, as we have matured, we are wholeheartedly dedicated to sharing our profound love for the ocean with all our guests.

Whether you are a devoted sea lover, a mountain enthusiast, or even an ardent cat enthusiast, you will find kindred spirits among us, harmoniously merging into an infinite tapestry of vibrant energy. We offer an array of captivating programs that promise not only wellness and rejuvenation but also the indescribable sensation of living your "best day ever."
Join us on this extraordinary journey, where the majesty of the sea, the awe-inspiring heights of the mountains, and the irresistible charm of our feline friends converge. Let us awaken your spirit and embark together on a voyage that will forever remain etched in your heart as "the best day of your life.".</Text>
      </Box>
    </Box>
  </Container>
  );

  
}

export default About;
