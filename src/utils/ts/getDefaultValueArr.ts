export default function getDefaultValueArr(obj: Object | undefined) {
  return obj
    ? Object.entries(obj).map(([key, value]) => ({
      name: key,
      value,
    }))
    : undefined;
}
