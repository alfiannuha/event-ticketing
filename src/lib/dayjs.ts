import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
// import utc from "dayjs/plugin/utc";

import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";

// TODO : locale still not working
const localdayjs = dayjs;
localdayjs.locale("id");
// dayjs.extend(utc);
localdayjs.extend(weekday);
localdayjs.extend(relativeTime);

export default localdayjs;
