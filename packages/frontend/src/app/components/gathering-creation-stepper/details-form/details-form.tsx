import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';
import { zones } from 'tzdata';
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';
import {
  GatheringFormDetails,
  gatheringFormDetailsSchema,
} from '@plan2gather/backend/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { FormStepProps } from '../types';

type DetailsFormProps = FormStepProps<GatheringFormDetails>;

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
    .sort((a, b) => {
      // Extract the numerical part and parse it into an integer
      const offsetA = parseInt(a.split('GMT')[1], 10);
      const offsetB = parseInt(b.split('GMT')[1], 10);

      // Compare the integer offsets
      return offsetA - offsetB;
    });

  // Guess the user's timezone
  const guessedTimezone = DateTime.local().zoneName ?? '';

  const formContext = useForm<GatheringFormDetails>({
    resolver: zodResolver(gatheringFormDetailsSchema),
    defaultValues: formData ?? {
      timezone: guessedTimezone,
    },
  });

  const selectedTimezone = formContext.watch('timezone');

  const selectedDateTime = DateTime.local().setZone(
    formContext.watch('timezone')
  );

  const diffTimezone = formContext.watch('timezone') !== guessedTimezone;
  const calculatedDiff =
    selectedDateTime.offset / 60 - DateTime.local().offset / 60;

  const formSubmitHandler = formContext.handleSubmit(onSuccessfulSubmit);

  useEffect(() => {
    setSubmitRef(formSubmitHandler);
  }, [setSubmitRef, formSubmitHandler]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Gathering Details
      </Typography>
      <Typography variant="subtitle2" gutterBottom sx={{ paddingBottom: 1.5 }}>
        Treat all fields as public information. Do not include any personal
        information.
      </Typography>
      <FormContainer formContext={formContext} onSuccess={onSuccessfulSubmit}>
        <Stack spacing={2} direction="column">
          <TextFieldElement
            name="name"
            label="Gathering Name"
            helperText="This name will be shared with all participants."
            required
          />
          <TextFieldElement
            name="description"
            label="Gathering Description"
            helperText="Optionally include a description of your gathering."
          />
          <AutocompleteElement
            name="timezone"
            label="Gathering Timezone"
            options={allTimeZones}
            autocompleteProps={{
              isOptionEqualToValue: (option, value) => option === value,
              getOptionLabel: (option) => option.replace(/_/g, ' '),
              filterOptions: (options, { inputValue }) => {
                const normalizedInput = inputValue
                  .toLowerCase()
                  .replace(/\s/g, '_'); // Replace spaces with underscores and make lowercase for comparison
                return options.filter((option) =>
                  option.toLowerCase().includes(normalizedInput)
                );
              },
            }}
            textFieldProps={{
              helperText:
                'The user will be notfied if their timezone is different from the gathering timezone.',
            }}
            required
          />
          {selectedTimezone && (
            <Grid container sx={{ textAlign: 'center' }}>
              <Grid xs={12} sm={diffTimezone ? 5 : 12}>
                <Typography variant="subtitle2" gutterBottom>
                  Current time in {formContext.watch('timezone')}:{' '}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {selectedDateTime.toFormat('ff')}
                </Typography>
              </Grid>
              {diffTimezone && (
                <>
                  <Grid xs={12} sm={2}>
                    {/* Show an arrow pointing to the left, and + or - how many hours between the timezones */}
                    <Typography variant="subtitle2" gutterBottom>
                      Time difference:{' '}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {/* Calculate hours different */}
                      {calculatedDiff ? '+' : ''}
                      {calculatedDiff} hours
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={5}>
                    <Typography variant="subtitle2" gutterBottom>
                      Your current time in {guessedTimezone}:{' '}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {DateTime.local().setZone(guessedTimezone).toFormat('ff')}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          )}
        </Stack>
      </FormContainer>
    </>
  );
}