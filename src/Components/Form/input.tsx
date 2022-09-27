import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChackraInput,
  InputProps as ChackraInputProps,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';

import { IconType } from 'react-icons/lib';

interface InputProps extends ChackraInputProps {
  name: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}

type inputVariationOptions = {
  [key: string]: string;
};

const InputVariation: inputVariationOptions = {
  error: 'red.500',
  default: 'gray.300',
  focus: 'blue.400',
  filled: 'green.500',
};

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  {
    name,
    error = null,
    icon: Icon,
    label,
    ...rest
  }: InputProps,
  ref,
) => {
  const [variation, setVariation] = useState('default');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (error) {
      return setVariation('error');
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    if (!error) {
      setVariation('focus');
    }
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      setVariation('filled');
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel>{label}</FormLabel>}
      <InputGroup flexDirection={'column'}>
        {!!Icon && (
          <InputLeftElement
            color={InputVariation[variation]}
            mt={'2.5'}
          >
            <Icon />
          </InputLeftElement>
        )}
        <ChackraInput
          id={name}
          name={name}
          color={InputVariation[variation]}
          borderColor={InputVariation[variation]}
          bg={'gray.50'}
          onFocus={handleInputFocus}
          onBlurCapture={handleInputBlur}
          onChangeCapture={(e) =>
            setValue(e.currentTarget.value)
          }
          variant={'outline'}
          _hover={{ bgColor: 'gray.100' }}
          _placeholder={{ color: 'gray.400' }}
          size={'lg'}
          h={'14'}
          ref={ref}
          {...rest}
        />
        {!!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )}
      </InputGroup>
    </FormControl>
  );
};

const Input = forwardRef(InputBase);

export default Input;
