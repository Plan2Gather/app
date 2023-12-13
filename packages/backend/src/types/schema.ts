import { z } from 'zod';
import { weekdays } from './const';
// eslint-disable-next-line import/no-cycle
import { consolidateAvailability } from '../utils';

/**
 * A valid datetime string with an offset.
 */
export const validDatetimeSchema = z.string().datetime({ offset: true });

/**
 * Date range schema with start and end dates.
 *
 * The start date is required to be before the end date.
 */
export const dateRangeSchema = z
  .object({
    start: validDatetimeSchema,
    end: validDatetimeSchema,
  })
  .refine(
    (data) => {
      // Parse the start and end dates
      const startDate = new Date(data.start);
      const endDate = new Date(data.end);

      // Ensure that the end date isn't before the start date
      return endDate >= startDate;
    },
    {
      message: 'End date/time should not be before the start date/time.',
      path: ['end'], // Pointing out the problematic field in the object
    }
  )
  .readonly();

export type DateRange = z.infer<typeof dateRangeSchema>;

export const weekdaySchema = z.enum(weekdays).readonly();

export type Weekday = z.infer<typeof weekdaySchema>;

const availabilitySchema = z.record(weekdaySchema, z.array(dateRangeSchema));

export type Availability = z.infer<typeof availabilitySchema>;

export const sortedAvailabilitySchema = availabilitySchema
  .transform((data) => consolidateAvailability(data))
  .readonly();

export const limitedAvailabilitySchema = z
  .record(weekdaySchema, z.array(dateRangeSchema).length(1))
  .transform((data) => consolidateAvailability(data))
  .readonly();

/**
 * User availability schema.
 *
 * The user availability is a record of user ID to availability.
 */
export const userAvailabilitySchema = z
  .object({
    name: z.string(),
    availability: sortedAvailabilitySchema,
  })
  .readonly();

export type UserAvailability = z.infer<typeof userAvailabilitySchema>;

export const userAvailabilityBackendSchema = z
  .record(z.string(), userAvailabilitySchema)
  .readonly();

export type UserAvailabilityBackend = z.infer<
  typeof userAvailabilityBackendSchema
>;

export const gatheringFormDetailsSchema = z.object({
  name: z.string().min(1, { message: 'A gathering name is required.' }),
  description: z.string().optional(),
  timezone: z.string().min(1, { message: 'A timezone is required.' }),
});

export type GatheringFormDetails = z.infer<typeof gatheringFormDetailsSchema>;

/**
 * Gathering form data schema.
 *
 * The gathering form data is the required data to create a gathering.
 */
export const gatheringFormPeriodsSchema = z.object({
  allowedPeriods: limitedAvailabilitySchema,
});

export type GatheringFormPeriods = z.infer<typeof gatheringFormPeriodsSchema>;

export const gatheringFormDataSchema = gatheringFormDetailsSchema.merge(
  gatheringFormPeriodsSchema
);

export type GatheringFormData = z.infer<typeof gatheringFormDataSchema>;

/**
 * Gathering data schema.
 * The gathering data is the gathering form data with an ID and user availability.
 */
export const gatheringDataSchema = z.object({
  ...gatheringFormDataSchema.shape,
  id: z.string(),
  creationDate: validDatetimeSchema,
});

export type GatheringData = z.infer<typeof gatheringDataSchema>;

export const gatheringBackendDataSchema = z
  .object({
    ...gatheringDataSchema.shape,
    creationUserId: z.string(),
    availability: userAvailabilityBackendSchema,
  })
  .readonly();

export type GatheringBackendData = z.infer<typeof gatheringBackendDataSchema>;

/**
 * My Meeting Page Schema
 */

export const ownedGatheringSchema = z
  .object({
    id: z.string(),
    name: z.string(),
  })
  .readonly();

export type OwnedGatheringData = z.infer<typeof ownedGatheringSchema>;

export const participatingGatheringSchema = z
  .object({
    id: z.string(),
    name: z.string(),
  })
  .readonly();

export type ParticipatingGathering = z.infer<
  typeof participatingGatheringSchema
>;
