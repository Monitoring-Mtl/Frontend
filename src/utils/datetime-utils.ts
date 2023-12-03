import { DateTime} from "luxon"; 
import { integerDivision } from "./math-utils";

const defaultDateFormat = "yyyy-MM-dd";
const timezone = "America/Montreal";

const toLocalDate = (date:string, format:string = defaultDateFormat) => DateTime.fromFormat(date, format, { zone: timezone });

export const toEpoch = (date:string, time:string) : number => {
    const splitTime = time.split(":");
    const localDate = toLocalDate(date).set({hour: Number(splitTime[0]), minute: Number(splitTime[1])});

    return integerDivision(localDate.toMillis(), 1000);
}