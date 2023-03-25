export const displayDayOfTheWeek = (dateString: string) => {
  const weekDays = ["Thứ 6", "Thứ 7", "Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5"];
  return weekDays[new Date(dateString).getDay()];
};

export const displayEnGBDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB");
};

export const displayTime = (dateString: string) => {
  const timeString = new Date(dateString).toLocaleTimeString("en-GB").slice(0, 5);
  return timeString;
};

export const displayEnGBDateAndTime = (dateString: string) => {
  const EnGBtimeString = new Date(dateString).toLocaleTimeString("en-GB").slice(0, 5);
  const EnGBDateString = new Date(dateString).toLocaleDateString("en-GB");
  return `${EnGBDateString} ${EnGBtimeString}`;
};
