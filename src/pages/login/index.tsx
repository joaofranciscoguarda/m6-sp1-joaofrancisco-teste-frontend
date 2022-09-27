import {
  Button,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {
  FaArrowAltCircleRight,
  FaEnvelope,
  FaLock,
} from 'react-icons/fa';

import Input from '../../Components/Form/input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Link as RRDLink } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { toast } from 'react-toastify';

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

interface SignInData {
  email: string;
  password: string;
}

function Login(): JSX.Element {
  const { token, getInfos, signIn, signOff } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn: SubmitHandler<SignInData> = (
    data: SignInData,
  ) => {
    setLoading(true);
    console.log(signIn, typeof signIn);
    signIn(data)
      .then((_) => {
        getInfos(token);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
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
          onSubmit={handleSubmit(handleSignIn)}
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
            <Heading>Faça seu login</Heading>
            <Input
              placeholder="Digite seu E-mail"
              icon={FaEnvelope}
              label={'Login'}
              type={'email'}
              error={errors.email}
              {...register('email')}
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
              Entrar
            </Button>
          </VStack>
          <VStack mt={'4'} spacing={'5'}>
            <Text>
              Ainda não possui uma conta?{' '}
              <Link as={RRDLink} to="/register">
                Cadastre-se
              </Link>
            </Text>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
}

export default Login;
