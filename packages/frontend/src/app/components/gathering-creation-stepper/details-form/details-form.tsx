import { Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { zones } from 'tzdata';
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';
import {
  MeetingFormDetails,
  meetingFormDetailsSchema,
} from '@plan2gather/backend/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { FormStepProps } from '../types';

type DetailsFormProps = FormStepProps<MeetingFormDetails>;

export default function DetailsForm({
  formData,
  setSubmitRef,
  onSuccessfulSubmit,
}: DetailsFormProps) {
  // Get all valid timezones
  const allTimeZones = Object.entries(zones)
    .filter(([_, v]) => Array.isArray(v))
    .map(([zoneName]) => zoneName)
    .filter(
      (tz) => DateTime.local().setZone(tz).isValid && tz.indexOf('/') !== -1
    )
    .sort();

  // Guess the user's timezone
  const guessedTimezone = DateTime.local().zoneName ?? '';

  const formContext = useForm<MeetingFormDetails>({
    resolver: zodResolver(meetingFormDetailsSchema),
    defaultValues: formData ?? {
      timezone: guessedTimezone,
    },
  });

  const formSubmitHandler = formContext.handleSubmit(onSuccessfulSubmit);

  useEffect(() => {
    setSubmitRef(formSubmitHandler);
  }, [setSubmitRef, formSubmitHandler]);

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ paddingBottom: 1.5 }}>
        Gathering Details
      </Typography>
      <FormContainer formContext={formContext} onSuccess={onSuccessfulSubmit}>
        <Stack spacing={2} direction="column">
          <TextFieldElement name="name" label="Gathering Name" required />
          <TextFieldElement
            name="description"
            label="Gathering Description"
            helperText="Optionally include a description of your gathering."
          />
          <AutocompleteElement
            name="timezone"
            label="Timezone"
            options={allTimeZones}
            autocompleteProps={{
              isOptionEqualToValue: (option, value) => option === value,
            }}
            required
          />
        </Stack>
      </FormContainer>
    </>
  );
}
