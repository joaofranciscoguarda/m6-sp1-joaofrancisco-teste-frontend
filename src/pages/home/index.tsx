import {
  Button,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import {
  FaPen,
  FaPlus,
  FaTrash,
  FaUserCircle,
} from 'react-icons/fa';
import Card from '../../Components/Cards/cards';
import { useAuth } from '../../contexts/authContext';

interface Contact {
  id: string;
  fullName: string;
  email: string;
  cellphone: string;
  ownerId: string;
}

function Home(): JSX.Element {
  const { user, signOff, token } = useAuth();

  // const getInfos = useCallback(
  //   async (token: string) => {
  //     const responseContacts = await api.get(
  //       'contact/',
  //       config,
  //     );
  //     const { data } = responseContacts;
  //     localStorage.setItem(
  //       '@teste:contacts',
  //       JSON.stringify(data),
  //     );
  //     localStorage.setItem(
  //       '@teste:user',
  //       JSON.stringify(user),
  //     );
  //   },
  //   [data.token],
  // );

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
        {user.contacts &&
          user.contacts.map(
          (contact: Contact, index: any) => (
            <Card contact={contact} index={index}></Card>
            )
          )
          // :
          // <Flex>
          //   <Text>Você ainda não criou nada, vamos criar?</Text>
          // </Flex>
        }
        {/* {!user.contacts && 
        } */}
      </Flex>
    </Flex>
  );
}

export default Home;
