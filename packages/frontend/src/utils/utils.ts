/* eslint-disable no-underscore-dangle */

import { Weekday } from '@plan2gather/backend/types';

export default class Utils {
  private static _weekdays: Weekday[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  public static get weekdays(): Weekday[] {
    return this._weekdays;
  }

  public static sortWeekdays = (days: Weekday[]): Weekday[] =>
    days.sort((a, b) => this._weekdays.indexOf(a) - this._weekdays.indexOf(b));
}
