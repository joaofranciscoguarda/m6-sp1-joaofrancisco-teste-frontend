import {
  Flex,
  FlexProps as FlexPropsChakra,
  Heading,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface Contacts {
  id: string;
  fullName: string;
  email: string;
  cellphone: string;
  ownerId: string;
}

interface FlexProps extends FlexPropsChakra {
  contact: Contacts;
  index: any;
}

function Card({ contact, index, ...rest }: FlexProps) {
  return (
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
        <Heading as={'h3'}>{contact.fullName}</Heading>
        <Text>{contact.email}</Text>
        <Text>{contact.cellphone}</Text>
      </Flex>
    </Flex>
  );
}

export default Card;
