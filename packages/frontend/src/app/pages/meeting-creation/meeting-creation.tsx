import Typography from '@mui/material/Typography';

import MeetingCreationForm from '../../components/meeting-creation-form/meeting-creation-form';

export default function Creation() {
  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        align="left"
        color="text.primary"
        gutterBottom
      >
        Create a meeting
      </Typography>
      <MeetingCreationForm />
    </>
  );
}
