import { useMemo } from 'react';

export default function useMergeObjects(...objects: (object | undefined)[]): object {
  const mergedObject = useMemo(() => {
    const deepCopiedObjects = objects.map((obj) => (obj ? JSON.parse(JSON.stringify(obj)) : {}));
    return Object.assign({}, ...deepCopiedObjects);
  }, [objects]);

  return mergedObject;
}
