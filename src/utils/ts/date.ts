export const longDateRegExp = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

export const toDateStringFormat = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
};
