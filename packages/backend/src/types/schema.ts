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

export type DateRange = z.infer<typeof dateRangeSchema>;

export const weekdaySchema = z.enum([
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
]);

export type Weekday = z.infer<typeof weekdaySchema>;

export const availabilitySchema = z.record(
    weekdaySchema,
    z.array(dateRangeSchema)
);

export type Availability = z.infer<typeof availabilitySchema>;

/**
 * User availability schema.
 *
 * The user availability is a record of user ID to availability.
 */
export const userAvailabilitySchema = z.record(z.string(), availabilitySchema);

export type UserAvailability = z.infer<typeof userAvailabilitySchema>;

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
