import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useRef } from 'react';
import { Theme } from '@mui/material/styles';
import { GatheringFormData } from '@plan2gather/backend/types';
import { useNavigate } from 'react-router';
import StepperControls from './stepper-controls/stepper-controls';
import DetailsForm from './details-form/details-form';
import PossibleDates from './possible-dates-form/possible-dates-form';
import Confirmation from './confirmation/confirmation';
import { trpc } from '../../../trpc';
import useGatheringStepperFormData, {
  GatheringStepperFormData,
} from './gathering-creation.store';

export default function GatheringCreationStepper() {
  // Keeps track of the current step in the stepper
  const [activeStep, setActiveStep] = useState(0);
  // Ref to the form submit function
  const formSubmitRef = useRef<{ submit: () => Promise<boolean> }>();

  const store = useGatheringStepperFormData();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const navigate = useNavigate();

  const createGathering = trpc.gatherings.put.useMutation({
    onSuccess: (data) => {
      navigate(`/gathering/${data}`);
    },
  });

  const transformToGatheringData = (
    data: GatheringStepperFormData
  ): GatheringFormData | null => {
    if (data.details && data.possibleDates) {
      return {
        name: data.details.name,
        description: data.details.description,
        timezone: data.details.timezone,
        scheduleType: 'dayOfWeek',
        allowedPeriods: [],
      };
    }
    return null;
  };

  const steps = ['Details', 'Possible Dates', 'Confirm Gathering'];

  // Handles setting the step
  const handleSetStep = async (callback: (prevStep: number) => number) => {
    const step = callback(activeStep);

    // When navigating forward, we need to do form validation
    if (step > activeStep) {
      const valid = await formSubmitRef.current?.submit();
      if (valid) {
        if (steps.length === step) {
          const data = transformToGatheringData(store);
          if (data) {
            createGathering.mutate(data);
          } else {
            console.error('Failed to create gathering');
          }
        } else {
          setActiveStep(step);
        }
      }
    } else {
      setActiveStep(step);
    }
  };

  const stepComponents = [
    <DetailsForm ref={formSubmitRef} />,
    <PossibleDates ref={formSubmitRef} />,
    <Confirmation ref={formSubmitRef} />,
  ];

  const createContent = (child: React.ReactNode) => (
    <>
      <Container>{child}</Container>
      <StepperControls
        activeStep={activeStep}
        setActiveStep={handleSetStep}
        numSteps={steps.length}
      />
    </>
  );

  return (
    <>
      <Stepper
        activeStep={activeStep}
        sx={{ paddingBottom: 2 }}
        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            {isSmallScreen && (
              <StepContent>{createContent(stepComponents[index])}</StepContent>
            )}
          </Step>
        ))}
      </Stepper>
      {!isSmallScreen && createContent(stepComponents[activeStep])}
    </>
  );
}
