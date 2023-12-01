import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface StepperControlsProps {
  activeStep: number;
  setActiveStep: (callback: (prevStep: number) => number) => void;
  numSteps: number;
}

export default function StepperControls(props: StepperControlsProps) {
  const { activeStep, setActiveStep, numSteps } = props;

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
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />
      <Button onClick={handleNext}>
        {activeStep === numSteps - 1 ? 'Finish' : 'Next'}
      </Button>
    </Box>
  );
}
