import { GatheringFormDetails, Weekday } from '@plan2gather/backend/types';
import { DateTime } from 'luxon';

export type SubmitFunction = () => Promise<{
  valid: boolean;
  data?: GatheringFormDetails | Weekday[] | Record<string, DateTime>;
}>;
