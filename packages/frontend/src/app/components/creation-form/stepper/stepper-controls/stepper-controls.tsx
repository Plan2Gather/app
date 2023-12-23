import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '../../../shared/buttons/loading/loading';

interface CreationStepperControlsProps {
  activeStep: number;
  setActiveStep: (callback: (prevStep: number) => number) => void;
  numSteps: number;
  loading: boolean;
}

export default function CreationStepperControls(
  props: CreationStepperControlsProps
) {
  const { activeStep, setActiveStep, numSteps, loading } = props;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      <Button
        color="inherit"
        disabled={activeStep === 0 || loading}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />
      <LoadingButton onClick={handleNext} loading={loading}>
        {activeStep === numSteps - 1 ? 'Finish' : 'Next'}
      </LoadingButton>
    </Box>
  );
}
