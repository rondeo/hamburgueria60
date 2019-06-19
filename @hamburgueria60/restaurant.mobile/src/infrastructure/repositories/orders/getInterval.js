import { convertToTimeZone } from 'date-fns-timezone/src/convertToTimeZone';
import addDays from 'date-fns/add_days';
import addMilliseconds from 'date-fns/add_milliseconds';
import format from 'date-fns/format';

export default function getInterval() {
  // TODO: avoid hardcoded, get it from admin
  const timeZone = 'America/Manaus';
  const time = '18:00:00';

  let startsAt = addDays(new Date(), -1);
  startsAt = format(startsAt, `YYYY-MM-DDT${time}Z`);
  startsAt = convertToTimeZone(startsAt, { timeZone });
  startsAt = startsAt.toISOString();

  let endsAt = startsAt;
  endsAt = addDays(endsAt, 1);
  endsAt = addMilliseconds(endsAt, -1);
  endsAt = endsAt.toISOString();

  return { startsAt, endsAt };
}
