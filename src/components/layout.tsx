import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import Navbar from '../components/navigation/navbar/index';
import { ChildInterface } from '@/interfaces/children/child.interface';

const Layout = ({ children }: ChildInterface) => {
  return (
    <Container
      minH='100vh'
      display='flex'
      flexDirection='column'
      justifyContent={'space-between'}
      maxW='full'
      p='0'
      zIndex='1'
    >
      <Navbar />
      {children}
    </Container>
  );
};

export default Layout;
