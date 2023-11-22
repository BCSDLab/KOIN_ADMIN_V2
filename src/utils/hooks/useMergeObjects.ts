import { useMemo } from 'react';

export default function useMergeObjects<T, U>(firstObject: T, secondObject: U): T & U {
  const mergedObject = useMemo(() => {
    const copyFirstObject = { ...firstObject };
    const copySecondObject = { ...secondObject };
    return { ...copyFirstObject, ...copySecondObject };
  }, [firstObject, secondObject]);

  return mergedObject;
}
