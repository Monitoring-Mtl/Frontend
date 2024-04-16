import { DateTime } from "luxon";
import { integerDivision } from "./math-utils";

const defaultDateFormat = "yyyy-MM-dd";
const timezone = "America/Montreal";

const toLocalDate = (date: string, format: string = defaultDateFormat) =>
  DateTime.fromFormat(date, format, { zone: timezone });

export const toEpochMillis = (date: string, time: string = "00:00"): number => {
  const splitTime = time.split(":");
  const localDate = toLocalDate(date).set({
    hour: Number(splitTime[0]),
    minute: Number(splitTime[1]),
  });

  return localDate.toMillis();
};

export const toEpoch = (date: string, time: string = "00:00"): number => {
  const epochMillis = toEpochMillis(date, time);
  return integerDivision(epochMillis, 1000);
};
