import Typography from '@mui/material/Typography';

import GatheringCreationStepper from '../../components/gathering-creation-stepper/gathering-creation-stepper';

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
      <GatheringCreationStepper />
    </>
  );
}
