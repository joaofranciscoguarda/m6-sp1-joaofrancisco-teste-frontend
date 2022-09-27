import {
  Button,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import {
  FaPen,
  FaPlus,
  FaTrash,
  FaUserCircle,
} from 'react-icons/fa';
import { useAuth } from '../../contexts/authContext';

interface Contact {
  id: string;
  fullName: string;
  email: string;
  cellphone: string;
  ownerId: string;
}

function Home(): JSX.Element {
  const { user, signOff } = useAuth();

  return (
    <Flex
      height={'100vh'}
      bgGradient={'white'}
      flexDirection={'column'}
      alignItems={'center'}
      width={'100%'}
    >
      <Flex
        flexDirection={'row'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
        width={'60%'}
        paddingY={'3'}
      >
        <Text fontSize={'25'}>
          Bem vindo {user.fullName}
        </Text>
        <Flex width={'30%'} justifyContent={'space-evenly'}>
          <Button fontSize={'20'}>
            <FaPlus />
          </Button>
          <Button fontSize={'20'}>
            <FaPen />
          </Button>
          <Button fontSize={'20'}>
            <FaTrash />
          </Button>

          <Button
            fontSize={'15'}
            bgColor={'red.300'}
            onClick={() => signOff()}
          >
            Sair
          </Button>
        </Flex>
      </Flex>
      <Flex
        flexDirection={'row'}
        flexWrap={'wrap'}
        w={'60%'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        {user.contacts.map(
          (contact: Contact, index: any) => (
            <Flex
              key={index}
              flexDirection={'row'}
              width={'200px'}
              alignItems={'center'}
              justifyContent={'space-between'}
              padding={'2'}
              bgColor={'gray.600'}
              color={'white'}
              borderRadius={'20'}
              boxShadow={
                '0px 10px 13px -7px #000000, 3px 25px 15px 3px rgba(0,0,0,0)'
              }
              mt={'5'}
              ml={'3'}
            >
              <FaUserCircle size={'55'} />
              <Flex
                alignItems={'center'}
                flexDirection={'column'}
                w={'70%'}
              >
                <Heading as={'h3'}>
                  {contact.fullName}
                </Heading>
                <Text>{contact.email}</Text>
                <Text>{contact.cellphone}</Text>
              </Flex>
            </Flex>
          ),
        )}
      </Flex>
    </Flex>
  );
}

export default Home;
