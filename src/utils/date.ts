export const toDMYString = (dateString: string) => {
  const date = new Date(dateString);
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate().toString().padStart(2, "0");
  const monthAbbreviation = monthAbbreviations[date.getMonth()];
  const year = date.getFullYear().toString().substring(2);

  return `${day} ${monthAbbreviation} ${year}`;
};
