const filterObject = <T extends Object & { id: number }>
  (obj:T, keys: Array<keyof T>): Partial<T> & Pick<T, 'id'> => {
  const filteredObject: Partial<T> = {};
  keys.forEach((key) => {
    filteredObject[key] = obj[key];
  });
  return filteredObject as Partial<T> & Pick<T, 'id'>;
};

export default filterObject;
