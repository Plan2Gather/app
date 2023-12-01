import { z } from 'zod';

/**
 * A valid datetime string with an offset.
 */
export const validDatetimeSchema = z.string().datetime();

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
  );

export type DateRange = z.infer<typeof dateRangeSchema>;

/**
 * Availability schema.
 *
 * The availability is an array of date ranges.
 */
export const availabilitySchema = z.array(dateRangeSchema);

export type Availability = z.infer<typeof availabilitySchema>;

export const scheduleTypeSchema = z.enum(['dayOfWeek', 'date']);

export type ScheduleType = z.infer<typeof scheduleTypeSchema>;

/**
 * User availability schema.
 *
 * The user availability is a record of user ID to availability.
 */
export const userAvailabilitySchema = z.record(z.string(), availabilitySchema);

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
  scheduleType: scheduleTypeSchema,
  allowedPeriods: availabilitySchema,
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
export const gatheringDataSchema = z
  .object({
    ...gatheringFormDataSchema.shape,
    id: z.string(),
    availability: userAvailabilitySchema,
    creationDate: validDatetimeSchema,
  })
  .readonly();

export type GatheringData = z.infer<typeof gatheringDataSchema>;
