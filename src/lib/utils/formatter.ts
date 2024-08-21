import { differenceInHours, format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  const now = new Date();
  const hoursDifference = differenceInHours(now, date);

  if (hoursDifference < 48) {
    return `${formatDistanceToNow(date, {
      locale: id,
    })} yang lalu`;
  } else {
    return format(date, "d MMMM yyyy", {
      locale: id,
    });
  }
};

interface GroupedData {
  [key: string]: number;
}

export function remapData(originalData: any[]) {
  const groupedData: GroupedData = {};

  originalData.forEach((item) => {
    const date = item.date ? new Date(item.date) : new Date(item.createdAt);
    const dateString = format(date, "dd MMM");

    if (!groupedData[dateString]) {
      groupedData[dateString] = 0;
    }
    groupedData[dateString]++;
  });

  const remappedData = Object.keys(groupedData).map((date) => {
    return { value: groupedData[date], label: date };
  });

  return remappedData;
}

export function monthlyRemap(originalData: any[]) {
  const groupedData: GroupedData = {};

  originalData.forEach((item) => {
    const date = item.date ? new Date(item.date) : new Date(item.createdAt);
    const dateString = format(date, "yy /MMM");

    if (!groupedData[dateString]) {
      groupedData[dateString] = 0;
    }
    groupedData[dateString]++;
  });

  const remappedData = Object.keys(groupedData).map((date) => {
    return { value: groupedData[date], label: date };
  });

  return remappedData;
}

export function convertToRoman(num: number) {
  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let roman = "";

  for (let i = 0; i < romanNumerals.length; i++) {
    while (num >= romanNumerals[i].value) {
      roman += romanNumerals[i].symbol;
      num -= romanNumerals[i].value;
    }
  }

  return roman;
}

export function getLetter(number: number) {
  return String.fromCharCode(96 + number);
}
