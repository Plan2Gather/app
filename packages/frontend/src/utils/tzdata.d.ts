// tzdata.d.ts
declare module 'tzdata' {
  export type TimeRule = [
    string, // start year or "only" or "max"
    string | null, // end year or null if not applicable
    string, // indication of start month or some other specifier
    string | number, // day indication or specific date
    string | number, // time indication
    string | null, // letters representing the type of day or null
    number, // offset in minutes from GMT
    string // letter representing the time status (Standard, Daylight, etc.)
  ];

  export type LocationTimezoneRules = TimeRule[];

  export interface TimezoneData {
    [location: string]: LocationTimezoneRules;
  }

  // Assuming the tzdata module exports an object with a property 'zones'
  // that contains all the timezone data
  export const zones: TimezoneData;
}
