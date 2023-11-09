import { Button, Stack } from '@mui/material';
import { DateTime } from 'luxon';
import { zones } from 'tzdata';
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';
import {
  meetingFormDataSchema,
  type MeetingFormData,
} from '@plan2gather/backend/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '../../../trpc';

export default function MeetingCreationForm() {
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

  const onSubmit = (data: MeetingFormData) => {
    trpc.meetings.put.useMutation().mutate(data);
  };

  const formContext = useForm<MeetingFormData>({
    resolver: zodResolver(meetingFormDataSchema),
    defaultValues: {
      timezone: guessedTimezone,
    },
  });

  return (
    <FormContainer formContext={formContext} onSuccess={onSubmit}>
      <Stack spacing={2} direction="column">
        <TextFieldElement name="name" label="Meeting Name" required autoFocus />
        <TextFieldElement name="description" label="Meeting Description" />
        <AutocompleteElement
          name="timezone"
          label="Timezone"
          options={allTimeZones}
          required
          autocompleteProps={{
            isOptionEqualToValue: (option, value) => option === value,
          }}
        />
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </Stack>
    </FormContainer>
  );
}
