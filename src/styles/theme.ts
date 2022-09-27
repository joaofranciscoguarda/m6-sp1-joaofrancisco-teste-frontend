import {
  extendTheme,
  theme as ChakraTheme,
} from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      bg: 'white',
      color: 'gray.900',
      lineHeight: 'tall',
    },
    a: {
      color: 'teal.500',
    },
  },
});
