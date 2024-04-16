import {
  Interval,
  eachDayOfInterval,
  eachHourOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  format,
} from "date-fns";
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

function createIntervals(
  createTimeFrame: (interval: Interval) => Date[],
  startDate: Date,
  endDate: Date
): [number, number][] {
  const timeFrames = createTimeFrame({ start: startDate, end: endDate });
  return timeFrames.map((date, index, array) =>
    index < array.length - 1
      ? [date.getTime(), array[index + 1].getTime() - 1]
      : [date.getTime(), endDate.getTime()]
  );
}

export function computeTimeIntervals(startEpoch: number, endEpoch: number) {
  console.log("computeTimeIntervals", startEpoch, endEpoch);
  const startDate = new Date(startEpoch);
  const endDate = new Date(endEpoch - 1);

  const hourlyIntervals = createIntervals(
    eachHourOfInterval,
    startDate,
    endDate
  );
  const dailyIntervals = createIntervals(eachDayOfInterval, startDate, endDate);
  const monthlyIntervals = createIntervals(
    eachMonthOfInterval,
    startDate,
    endDate
  );
  const yearlyIntervals = createIntervals(
    eachYearOfInterval,
    startDate,
    endDate
  );

  return { monthlyIntervals, yearlyIntervals };
}

export function formatIntervals(intervals: {
  [key: string]: [number, number][];
}) {
  const formatted = {};
  for (const key in intervals) {
    formatted[key] = intervals[key].map(
      ([start, end]) =>
        `[${format(new Date(start), "PPpp")}, ${format(new Date(end), "PPpp")}]`
    );
  }
  return formatted;
}
