import moment from 'moment';

export const toHumanFullDate = timestamp => moment(timestamp * 1000).utcOffset('+0000').format('dddd, D MMMM YYYY');
export const toHumanShortDate = timestamp => moment(timestamp * 1000).utcOffset('+0000').format('DD.MM.YY – HH:mm');
export const toHumanTime = timestamp => moment(timestamp * 1000).utcOffset('+0000').format('HH:mm');
export const toISO = timestamp => moment(timestamp * 1000).utcOffset('+0000').format();
export const fromUtcToHuman = timestamp => moment.utc(timestamp).utcOffset('+0000').format('dddd, D MMMM YYYY');
export const fromUtcToISO = timestamp => moment.utc(timestamp).utcOffset('+0000').format();