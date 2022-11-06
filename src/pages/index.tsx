import config from '@/config/general.config';
import { Center, Container, Spinner, useDisclosure } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useProfileStore } from 'src/app/store/profile/profileStore';
import ChooseUs from 'src/components/landing/Home/ChooseUs';
import Hero from 'src/components/landing/Home/Hero/Hero';
import Scroll from 'src/components/landing/Home/Hero/Scroll';
import Philosophy from 'src/components/landing/Home/Philosophy';
import Section1 from 'src/components/landing/Home/Sections/Section1';
import Section2 from 'src/components/landing/Home/Sections/Section2';
import CreateUserModal from 'src/components/modals/CreateUserModal';
import SEO from 'src/components/SEO/SEO';
import { IProfileStore } from '@/interfaces/store/profileStore.interface';

const Home: NextPage = () => {
  return (
    <>
      <SEO
        title={`${config.general.name}`}
        description={`${config.general.name} is a decentralized hiring platform`}
        image={`https://solana.ghost.io/content/images/2022/06/solana-network-upgrades.png`}
      />
      <Container maxW="full" p="0">
        <Hero />
        <Scroll />
        <ChooseUs />
        <Philosophy />
        <Section1 />
        <Section2 />
      </Container>
    </>
  );
};

export default Home;
