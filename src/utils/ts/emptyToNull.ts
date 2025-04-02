export default function emptyToNull<T extends object>(obj: T): T {
  const converted = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (value === '') return [key, null];
      return [key, value];
    }),
  );
  return converted as T;
}
