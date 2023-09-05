import { useState } from 'react';
import type { ChangeEvent } from 'react';

type UseInputReturnType = [string, (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void, React.Dispatch<React.SetStateAction<string>>];

const useInput = (initialValue = ''): UseInputReturnType => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setValue(newValue || e.target.value);
  };

  return [value, onChange, setValue];
};

export default useInput;
