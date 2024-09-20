import * as moment from 'moment-timezone';

export const expirationDate = moment().tz('Asia/Phnom_Penh').add(7, 'days').toDate();
export const currentTime = moment().tz('Asia/Phnom_Penh').toDate();
