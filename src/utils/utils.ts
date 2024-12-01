export function convertTimestampToFormattedDate(timestamp: string): string {
  const date = new Date(parseInt(timestamp) * 1000);

  // Get the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "short" }); // 'Jun'
  const year = date.getFullYear();

  // Add the ordinal suffix to the day
  const ordinalSuffix = (n: number) => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };
  return `${ordinalSuffix(day)} ${month} ${year}`;
}
