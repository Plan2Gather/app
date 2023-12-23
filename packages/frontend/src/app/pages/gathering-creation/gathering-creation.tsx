import Typography from '@mui/material/Typography';

import CreationStepper from '../../components/creation-form/stepper/stepper';

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
        Plan a Gathering
      </Typography>
      <CreationStepper />
    </>
  );
}
