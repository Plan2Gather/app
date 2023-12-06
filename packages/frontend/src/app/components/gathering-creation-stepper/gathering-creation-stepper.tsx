import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useRef, useCallback, useMemo } from 'react';
import { Theme } from '@mui/material/styles';
import {
  Availability,
  GatheringFormData,
  GatheringFormDetails,
  Weekday,
} from '@plan2gather/backend/types';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import StepperControls from './stepper-controls/stepper-controls';
import DetailsForm from '../gathering-form/details-form/details-form';
import PossibleDates from '../gathering-form/possible-dates-form/possible-dates-form';
import Confirmation from '../gathering-form/confirmation/confirmation';
import TimePeriods from '../gathering-form/time-periods/time-periods';
import { trpc } from '../../../trpc';
import useGatheringStepperFormData, {
  GatheringStepperFormData,
} from './gathering-creation.store';
import { SubmitFunction } from '../gathering-form/types';

// Define a type for step information
type StepInfo<T> = {
  name: string;
  submitRef: React.RefObject<{ submit: SubmitFunction<T> }>;
};

export default function GatheringCreationStepper() {
  // Keeps track of the current step in the stepper
  const [activeStep, setActiveStep] = useState(0);

  const detailsRef = useRef<{ submit: SubmitFunction<GatheringFormDetails> }>(
    null
  );
  const possibleDatesRef = useRef<{ submit: SubmitFunction<Weekday[]> }>(null);
  const timePeriodsRef = useRef<{ submit: SubmitFunction<Availability> }>(null);
  const confirmRef = useRef<{ submit: SubmitFunction<undefined> }>(null);

  // Define your steps with their respective refs
  const steps: StepInfo<
    GatheringFormDetails | Weekday[] | Availability | undefined
  >[] = useMemo(
    () => [
      { name: 'Details', submitRef: detailsRef },
      { name: 'Possible Dates', submitRef: possibleDatesRef },
      { name: 'Time Periods', submitRef: timePeriodsRef },
      { name: 'Confirm Gathering', submitRef: confirmRef },
    ],
    []
  );

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

  const transformToGatheringData = useCallback(
    (data: GatheringStepperFormData): GatheringFormData | null => {
      if (data.details && data.possibleDates) {
        const result = {
          name: data.details.name,
          description: data.details.description,
          timezone: data.details.timezone,
          allowedPeriods: data.timePeriods,
        };
        return result;
      }
      return null;
    },
    []
  );

  // Handles setting the step
  const handleSetStep = useCallback(
    async (callback: (prevStep: number) => number) => {
      const step = callback(activeStep);
      const currentStepRef = steps[activeStep].submitRef;

      // When navigating forward, we need to do form validation
      if (step > activeStep) {
        const result = await currentStepRef.current?.submit();
        if (result && result.valid) {
          // Store the result data based on the active step
          switch (activeStep) {
            case 0:
              store.setDetails(result.data as GatheringFormDetails);
              break;
            case 1:
              store.setPossibleDates(result.data as Weekday[]);
              break;
            case 2:
              store.setTimePeriods(result.data as Availability);
              break;
            case 3:
            default:
              break;
          }

          // If we're on the last step, create the gathering
          if (steps.length === step) {
            const data = transformToGatheringData(store);
            if (data) {
              createGathering.mutate(data);
            } else {
              throw new Error('Invalid data');
            }
          } else {
            setActiveStep(step);
          }
        }
      } else {
        setActiveStep(step);
      }
    },
    [activeStep, createGathering, steps, store, transformToGatheringData]
  );

  const stepComponents = steps.map((step) => {
    switch (step.name) {
      case 'Details':
        return <DetailsForm initial={store.details} ref={step.submitRef} />;
      case 'Possible Dates':
        return (
          <PossibleDates initial={store.possibleDates} ref={step.submitRef} />
        );
      case 'Time Periods':
        return (
          <>
            <Typography variant="h5">Time Periods</Typography>
            <Typography variant="body1" paragraph>
              You may restrict time period for the possible dates. If you do not
              restrict the time period, the gathering will allow scheduling
              during the entire day.
            </Typography>
            <TimePeriods
              initial={store.timePeriods}
              days={store.possibleDates}
              timezone={store.details?.timezone}
              ref={step.submitRef}
            />
          </>
        );
      case 'Confirm Gathering':
        return <Confirmation initial={store} ref={step.submitRef} />;
      default:
        return null;
    }
  });

  const createContent = useCallback(
    (child: React.ReactNode) => (
      <>
        <Container>{child}</Container>
        <StepperControls
          activeStep={activeStep}
          setActiveStep={handleSetStep}
          numSteps={steps.length}
        />
      </>
    ),
    [activeStep, handleSetStep, steps.length]
  );

  return (
    <>
      <Stepper
        activeStep={activeStep}
        sx={{ paddingBottom: 2 }}
        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
      >
        {steps.map((step, index) => (
          <Step key={step.name}>
            <StepLabel>{step.name}</StepLabel>
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
