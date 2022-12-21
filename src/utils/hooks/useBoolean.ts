import { useState } from 'react';

export default function useBooleanState(defaultValue?: boolean) {
  const [isValue, setIsValue] = useState(!!defaultValue);

  const setTrue = () => setIsValue(true);
  const setFalse = () => setIsValue(false);
  const changeValue = () => setIsValue((x) => !x);

  return {
    isValue, setIsValue, setTrue, setFalse, changeValue,
  } as const;
}
