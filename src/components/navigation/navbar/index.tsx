import {
  Flex,
  useColorMode,
  Center,
  Box,
  Collapse,
  useDisclosure,
  useColorModeValue,
  Button,
  Badge,
  Divider,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Squeeze as Hamburger } from 'hamburger-react';
import Switch from '../../buttons/DarkModeSwitch';
import Phantom from './Phantom';

const Navbar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const router = useRouter();

  return (
    <Center
      display='flex'
      flexDirection='column'
      p={{ base: '1rem 1rem', sm: '1rem 2rem', md: '1rem 3rem' }}
    >
      <Flex
        maxW={'7xl'}
        w={'100%'}
        h={20}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Center display={{ base: 'flex', lg: 'none' }}>
          <Hamburger
            toggled={isOpen}
            toggle={onToggle}
            size={30}
            duration={0.4}
            rounded
          />
        </Center>
        <Link href='/'>
          <Box
            display={{ base: 'none', md: 'flex' }}
            as='button'
            fontSize={['xl', '3xl']}
            fontWeight={'800'}
            transition={'all 0.3s ease'}
            _hover={{
              color: 'grey',
            }}
            h='fit-content'
          >
            D-Hire
          </Box>
        </Link>
        <nav>
          <Flex direction='row' gap='2rem'>
            <Center
              ml='auto'
              display={{ base: 'none', lg: 'flex' }}
              flexDirection='row'
              fontSize='xl'
              minH='100%'
              gap={{ base: '0', md: '2vw', lg: '3vw' }}
              maxW='36rem'
              fontWeight='600'
            >
              <Link href='/about'>
                <Box
                  as='button'
                  transition={'all 0.3s ease'}
                  _hover={{
                    color: 'grey',
                  }}
                >
                  About
                </Box>
              </Link>
              <Link href='/job'>
                <Center>
                  <Box
                    as='button'
                    transition={'all 0.3s ease'}
                    _hover={{
                      color: 'grey',
                    }}
                  >
                    Job Hunt
                  </Box>
                  <Badge
                    position='absolute'
                    px='0.4rem'
                    transform='translate(2.5rem, -1rem)'
                    variant={'solid'}
                    rounded={'full'}
                    bg='#FD6444'
                  >
                    2
                  </Badge>
                </Center>
              </Link>
              <Link href='/hire'>
                <Center>
                  <Box
                    as='button'
                    transition={'all 0.3s ease'}
                    _hover={{
                      color: 'grey',
                    }}
                  >
                    Hire Talent
                  </Box>
                  {/* <Badge
                    position='absolute'
                    px='0.4rem'
                    transform='translate(3rem, -1rem)'
                    variant={'solid'}
                    rounded={'full'}
                  >
                    2
                  </Badge> */}
                </Center>
              </Link>
            </Center>
            {/* <Center display={{ base: 'none', lg: 'flex' }}>
              <Switch />
            </Center> */}
            <Button size={['sm', 'md']} display='flex' gap={'1rem'}>
              Connect Wallet
              <Phantom />
            </Button>
          </Flex>
        </nav>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex
          display={{ base: 'flex', lg: 'none' }}
          flexDirection='column'
          alignItems='start'
          fontSize='22px'
          p='2rem 1rem'
          gap='1.4rem'
        >
          <Link href='/about'>
            <Box
              display='flex'
              alignItems={'start'}
              w='100%'
              onClick={() => onClose()}
              as='button'
              transition={'all 0.3s ease'}
              _hover={{
                color: 'grey',
              }}
              fontWeight='500'
            >
              About
            </Box>
          </Link>
          <Link href='/job'>
            <Flex
              direction={'row'}
              alignItems='center'
              justify={'space-between'}
              w='100%'
            >
              <Box
                display='flex'
                alignItems={'start'}
                w='100%'
                onClick={() => onClose()}
                as='button'
                transition={'all 0.3s ease'}
                _hover={{
                  color: 'grey',
                }}
                fontWeight='500'
              >
                Job Hunt
              </Box>
              <Badge
                px='0.4rem'
                variant={'solid'}
                rounded={'full'}
                bg='#FD6444'
                fontSize='md'
              >
                2
              </Badge>
            </Flex>
          </Link>
          <Link href='/hire'>
            <Box
              display='flex'
              alignItems={'start'}
              w='100%'
              onClick={() => onClose()}
              as='button'
              transition={'all 0.3s ease'}
              _hover={{
                color: 'grey',
              }}
              fontWeight='500'
            >
              Hire Talent
            </Box>
          </Link>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            w='84vw'
            as='button'
            transition={'all 0.3s ease'}
          >
            {/* {useColorModeValue('Dark Mode', 'Light Mode')}
            <Switch /> */}
          </Box>
          <Box w='100%' h='0.09rem' bg='gray.500' />
        </Flex>
        <Divider />
      </Collapse>
    </Center>
  );
};
export default Navbar;
