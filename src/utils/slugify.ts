const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");

export const getIdFromSlug = (slug: string) => {
  const arr = slug.split("-");
  return arr[arr.length - 1];
};

export const generateSlug = ({
  departureStation,
  arrivalStation,
  id,
}: {
  departureStation: string;
  arrivalStation: string;
  id: number;
}) => {
  return removeSpecialCharacter(`${departureStation} Tới ${arrivalStation}`).replace(/\s/g, "-") + `-${id}`;
};
