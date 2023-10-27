import { MeetingData } from '../types/schema';
import type { IsEqual } from 'type-fest';

export const bulkKeys = ['meetings'] as const;

// TODO: Add type assert of BulkKey == keyof BulkKeyMap
export type BulkKey = (typeof bulkKeys)[number];

export type BulkKeyMap = {
  meetings: MeetingData[];
};

export const ALL_MEETING_KEY = 'all';

type TypeEqual = IsEqual<BulkKey, keyof BulkKeyMap> extends true ? true : never;
// Error will be generated here if the BulkKey union does not match the keys of BulkKeyMap
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const realPart: TypeEqual = true;
