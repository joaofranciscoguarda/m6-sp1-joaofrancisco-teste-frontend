import {
  Button,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/authContext';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {
  FaEnvelope,
  FaLock,
  FaPeopleArrows,
  FaPersonBooth,
  FaPhone,
  FaUser,
} from 'react-icons/fa';
import { Link as RRDLink } from 'react-router-dom';
import Input from '../../Components/Form/input';

interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  cellphone: string;
}

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
  cellphone: yup
    .string()
    .required('Telefone é obrigatório'),
  fullName: yup
    .string()
    .required('Nome completo é obrigatório'),
});

function Register(): JSX.Element {
  const { token, signUp, getInfos, signOff } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignUp: SubmitHandler<SignUpData> = (
    data: SignUpData,
  ) => {
    setLoading(true);
    signUp(data)
      .then((_) => {
        setLoading(false);
        getInfos(token);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <Flex
      height={'100vh'}
      alignItems={['auto', 'auto', '100vh', '100vh']}
      justifyContent={'center'}
      bgGradient={[
        'linear(to-b, gray.500 65%, white 35%)',
        'linear(to-b, gray.500 65%, white 35%)',
        'linear(to-r, gray.500 65%, white 35%)',
        'linear(to-r, gray.500 65%, white 35%)',
      ]}
      padding={['10px 15px', '10px 15px', '0px', '0px']}
    >
      <Flex
        w={['100%', '100%', '90%', '70%']}
        justifyContent={'center'}
        flexDirection={['column', 'column', 'row', 'row']}
        alignItems={'center'}
        height={'100vh'}
      >
        <Grid
          w={['100%', '100%', '50%', '50%']}
          paddingRight={'10rem'}
        >
          <Heading
            fontSize={'3rem'}
            color={'white'}
            as={'h1'}
          >
            Fácil e grátis
          </Heading>
          <Text fontSize={'1.1rem'} color={'white'}>
            Suas listas de contato em apenas um só lugar
            Flexivel e atrativo de gerenciar
          </Text>
        </Grid>
        <Grid
          as={'form'}
          onSubmit={handleSubmit(handleSignUp)}
          mt={'4'}
          w={'50%'}
          maxW={'450px'}
          padding={'30px 15px'}
          border={'3px solid'}
          borderColor={'gray.100'}
          borderRadius={'10'}
          bg={'white'}
          color={'gray.900'}
          boxShadow={'0px 3px 10px rgba(0,0,0,.8)'}
          marginRight={'5vw'}
        >
          <VStack spacing={'5'}>
            <Heading>Faça seu cadastro</Heading>
            <Input
              placeholder="Digite seu E-mail"
              icon={FaEnvelope}
              label={'E-mail'}
              type={'email'}
              error={errors.email}
              {...register('email')}
            />
            <Input
              placeholder="Seu nome completo"
              icon={FaUser}
              label={'Nome Completo'}
              error={errors.fullName}
              {...register('fullName')}
            />
            <Input
              placeholder="Digite seu telefone"
              icon={FaPhone}
              label={'Telefone'}
              error={errors.cellphone}
              {...register('cellphone')}
            />
            <Input
              placeholder="Digite sua senha"
              icon={FaLock}
              label={'Senha'}
              type={'password'}
              error={errors.password}
              {...register('password')}
            />
            <Button
              isLoading={loading}
              type={'submit'}
              bg={'blue.600'}
              color={'white'}
              _hover={{ bgColor: 'blue.900' }}
              borderRadius={'2'}
              height={'14'}
              width={'100%'}
              fontSize={'1.2rem'}
            >
              Cadastrar
            </Button>
          </VStack>
          <VStack mt={'4'} spacing={'5'}>
            <Text>
              Já possui uma conta?{' '}
              <Link as={RRDLink} to="/login">
                Faça login
              </Link>
            </Text>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
}

export default Register;
