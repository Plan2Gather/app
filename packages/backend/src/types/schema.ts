import { z } from 'zod';

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
  );

/**
 * Day of the week schema.
 *
 * The day of the week is required to be an integer between 0 and 6,
 * where 0 is Sunday and 6 is Saturday.
 */
export const dayOfWeekSchema = z.coerce
  .number()
  .int()
  .refine((value) => value >= 0 && value <= 6, {
    message: 'Day of the week should be an integer between 0 and 6.',
  });

/**
 * Availability schema.
 *
 * The availability is an array of date ranges.
 */
export const availabilitySchema = z.array(dateRangeSchema);

/**
 * User availability schema.
 *
 * The user availability is a record of user ID to availability.
 */
export const userAvailabilitySchema = z.record(z.string(), availabilitySchema);

/**
 * Meeting form data schema.
 *
 * The meeting form data is the required data to create a meeting.
 */
export const meetingFormDataSchema = z.object({
  name: z.string(),
  description: z.string(),
  timezone: z.string(),
  allowedPeriods: availabilitySchema,
});

export type MeetingFormData = z.infer<typeof meetingFormDataSchema>;

/**
 * Meeting data schema.
 * The meeting data is the meeting form data with an ID and user availability.
 */
export const meetingDataSchema = z.object({
  ...meetingFormDataSchema.shape,
  id: z.string().uuid(),
  availability: userAvailabilitySchema,
  creationDate: validDatetimeSchema,
});

export type MeetingData = z.infer<typeof meetingDataSchema>;
