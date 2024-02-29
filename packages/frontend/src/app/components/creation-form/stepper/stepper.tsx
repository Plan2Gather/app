import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import useCreationStore, {
  type CreationStore,
} from '@/app/components/creation-form/creation.store';
import Confirmation from '@/app/components/creation-form/steps/confirmation/confirmation';
import DetailsForm from '@/app/components/creation-form/steps/details/details';
import PossibleDates from '@/app/components/creation-form/steps/possible-dates/possible-dates';
import TimePeriodsStep from '@/app/components/creation-form/steps/time-periods/time-periods';
import { trpc } from '@/trpc';

import CreationStepperControls from './stepper-controls/stepper-controls';

import type { SubmitFunction } from '@/app/components/creation-form/types';
import type {
  Availability,
  GatheringFormData,
  GatheringFormDetails,
  Weekday,
} from '@backend/types';
import type { Theme } from '@mui/material/styles';

// Define a type for step information
interface StepInfo<T> {
  name: string;
  submitRef: React.RefObject<{ submit: SubmitFunction<T> }>;
}

export default function CreationStepper() {
  // Keeps track of the current step in the stepper
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const detailsRef = useRef<{ submit: SubmitFunction<GatheringFormDetails> }>(null);
  const possibleDatesRef = useRef<{ submit: SubmitFunction<Weekday[]> }>(null);
  const timePeriodsRef = useRef<{ submit: SubmitFunction<Availability> }>(null);
  const confirmRef = useRef<{ submit: SubmitFunction<undefined> }>(null);

  // Define your steps with their respective refs
  const steps: Array<StepInfo<GatheringFormDetails | Weekday[] | Availability | undefined>> =
    useMemo(
      () => [
        { name: 'Details', submitRef: detailsRef },
        { name: 'Possible Dates', submitRef: possibleDatesRef },
        { name: 'Time Periods', submitRef: timePeriodsRef },
        { name: 'Confirm Gathering', submitRef: confirmRef },
      ],
      []
    );

  const store = useCreationStore();

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const utils = trpc.useUtils();
  const createGathering = trpc.gatherings.put.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: async (id) => {
      await utils.gatherings.getOwnedGatherings.invalidate();
      navigate(`/gathering/${id}`);
      setLoading(false);
    },
  });

  const transformToGatheringData = useCallback((data: CreationStore): GatheringFormData | null => {
    if (data.details != null && data.possibleDates.length > 0) {
      const result = {
        name: data.details.name,
        description: data.details.description,
        timezone: data.details.timezone,
        allowedPeriods: data.timePeriods,
      };
      return result;
    }
    return null;
  }, []);

  // Handles setting the step
  const handleSetStep = useCallback(
    async (callback: (prevStep: number) => number) => {
      const step = callback(activeStep);
      const currentStepRef = steps[activeStep].submitRef;

      // When navigating forward, we need to do form validation
      if (step > activeStep) {
        const result = await currentStepRef.current?.submit();
        if (result != null && result.valid) {
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
            if (data != null) {
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
        return <PossibleDates initial={store.possibleDates} ref={step.submitRef} />;
      case 'Time Periods':
        return (
          <>
            <Typography variant="h5">Time Periods</Typography>
            <Typography variant="body1" paragraph>
              You may restrict time period for the possible dates. If you do not restrict the time
              period, the gathering will allow scheduling during the entire day.
            </Typography>
            <TimePeriodsStep
              initial={store.timePeriods}
              days={store.possibleDates}
              timezone={store.details?.timezone}
              ref={step.submitRef}
              assumeFullDay
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
        <CreationStepperControls
          activeStep={activeStep}
          setActiveStep={(callback) => {
            void handleSetStep(callback);
          }}
          numSteps={steps.length}
          loading={loading}
        />
      </>
    ),
    [activeStep, handleSetStep, loading, steps.length]
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
            {isSmallScreen && <StepContent>{createContent(stepComponents[index])}</StepContent>}
          </Step>
        ))}
      </Stepper>
      {!isSmallScreen && createContent(stepComponents[activeStep])}
    </>
  );
}
