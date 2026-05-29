export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatHour(date: Date | string) {
  return new Date(date).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function stringToColor(str: string) {
  let hash = 0;
  let charCode = 0;
  for (let i = 0; i < str.length; i++) {
    charCode = str.charCodeAt(i);
    hash = 31 * hash + charCode;
  }

  const backgroundColors = [
    "#253E5F",
    "#E1F5EE",
    "#EEEDFE",
    "#FAECE7",
    "#FAEEDA",
  ];

  const colors = ["#759ECF", "#0B5243", "#40388B", "#712B13", "#633806"];

  return {
    backgroundColor: backgroundColors[Math.abs(hash) % colors.length],
    color: colors[Math.abs(hash) % colors.length],
  };
}

export function getDateNow() {
  const now = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // change to format "dayName, dd mm yy"
  const formatDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const day = dayNames[now.getDay()];

  return `${day}, ${formatDate}`;
}

export function generatePagination(currentPage: number, totalPages: number) {
  // if the total pages is 8 or less
  if (totalPages <= 8) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // if the current page in the begin 3 pages
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  // if the current page in the last 3 pages
  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // if the current page is somewhere in the mid
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}
