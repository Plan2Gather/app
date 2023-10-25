import type { IsEqual } from 'type-fest';

export const bulkKeys = [] as const;

// TODO: Add type assert of BulkKey == keyof BulkKeyMap
export type BulkKey = (typeof bulkKeys)[number];

export type BulkKeyMap = {};

type TypeEqual = IsEqual<BulkKey, keyof BulkKeyMap> extends true ? true : never;
// Error will be generated here if the BulkKey union does not match the keys of BulkKeyMap
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const realPart: TypeEqual = true;
