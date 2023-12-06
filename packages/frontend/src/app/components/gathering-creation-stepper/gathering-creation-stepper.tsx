import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useRef, useCallback } from 'react';
import { Theme } from '@mui/material/styles';
import {
  Availability,
  GatheringFormData,
  GatheringFormDetails,
  Weekday,
  availabilitySchema,
} from '@plan2gather/backend/types';
import { useNavigate } from 'react-router';
import { DateTime } from 'luxon';
import Utils from '../../../utils/utils';
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
type StepInfo = {
  name: string;
  submitRef: React.RefObject<{ submit: SubmitFunction }>;
};

export default function GatheringCreationStepper() {
  // Keeps track of the current step in the stepper
  const [activeStep, setActiveStep] = useState(0);

  const detailsRef = useRef<{ submit: SubmitFunction }>(null);
  const possibleDatesRef = useRef<{ submit: SubmitFunction }>(null);
  const timePeriodsRef = useRef<{ submit: SubmitFunction }>(null);
  const confirmRef = useRef<{ submit: SubmitFunction }>(null);

  // Define your steps with their respective refs
  const steps: StepInfo[] = [
    { name: 'Details', submitRef: detailsRef },
    { name: 'Possible Dates', submitRef: possibleDatesRef },
    { name: 'Time Periods', submitRef: timePeriodsRef },
    { name: 'Confirm Gathering', submitRef: confirmRef },
  ];

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

  const convertTimePeriodsToBackendDates = useCallback(
    (tps: Record<string, DateTime>): Availability => {
      const convertedSchedule: Partial<
        Record<Weekday, Array<{ id: string; start: string; end: string }>>
      > = {};

      Object.keys(tps).forEach((key) => {
        const match = key.match(/(^[a-zA-Z]+)_(\d+)_(start|end)$/);
        if (match) {
          const day = match[1].toLowerCase(); // Convert to lowercase to match the enum values
          const index = match[2]; // Identifier for the time period
          const type = match[3] as 'start' | 'end';

          if (Object.values(Utils.weekdays).includes(day as Weekday)) {
            const weekday = day as Weekday;

            if (!convertedSchedule[weekday]) {
              convertedSchedule[weekday] = [];
            }

            let timeSlot = convertedSchedule[weekday]?.find(
              (slot) => slot.id === index
            );
            if (!timeSlot) {
              timeSlot = { id: index, start: '', end: '' };
              convertedSchedule[weekday]!.push(timeSlot);
            }

            timeSlot[type] = tps[key].toISO()!;
          }
        }
      });

      // Validate the overall schedule - this strips the id field
      const parsedSchedule = availabilitySchema.parse(convertedSchedule);

      return parsedSchedule;
    },
    []
  );

  const transformToGatheringData = useCallback(
    (data: GatheringStepperFormData): GatheringFormData | null => {
      if (data.details && data.possibleDates) {
        const result = {
          name: data.details.name,
          description: data.details.description,
          timezone: data.details.timezone,
          allowedPeriods: convertTimePeriodsToBackendDates(data.timePeriods),
        };
        return result;
      }
      return null;
    },
    [convertTimePeriodsToBackendDates]
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
              store.setTimePeriods(result.data as Record<string, DateTime>);
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
    [activeStep, createGathering, steps.length, store, transformToGatheringData]
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
        return <TimePeriods initial={store.timePeriods} ref={step.submitRef} />;
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
