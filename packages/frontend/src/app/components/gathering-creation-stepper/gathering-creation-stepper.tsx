import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useRef } from 'react';
import { Theme } from '@mui/material/styles';
import {
  GatheringFormData,
  GatheringFormDetails,
} from '@plan2gather/backend/types';
import { useNavigate } from 'react-router';
import StepperControls from './stepper-controls/stepper-controls';
import DetailsForm from './details-form/details-form';
import PossibleDates, {
  PossibleDateSelection,
} from './possible-dates-form/possible-dates-form';
import Confirmation from './confirmation/confirmation';
import TimePeriods from './time-periods/time-periods';
import { trpc } from '../../../trpc';
import { DateRangeLuxon } from '../time-range-selections/time-range-picker/time-range-picker';

const steps = [
  'Details',
  'Possible Dates',
  'Time Periods',
  'Confirm Gathering',
];

export default function GatheringCreationStepper() {
  // Keeps track of the current step in the stepper
  const [activeStep, setActiveStep] = useState(0);

  // Keeps track of the details
  const [details, setDetails] = useState<GatheringFormDetails | null>(null);

  // Keeps track of the possible dates
  const [possibleDates, setPossibleDates] =
    useState<PossibleDateSelection | null>(null);

  // Keeps track of the time periods
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timePeriods, setTimePeriods] = useState([] as DateRangeLuxon[]);

  // Keeps track of the combined form data for the confirmation step
  const [gatheringFormData, setGatheringFormData] =
    useState<GatheringFormData | null>(null);

  // Ref to the form submit function
  const formSubmitRef = useRef<() => Promise<void>>(async () => {});
  const setSubmitRef = (ref: () => Promise<void>) => {
    formSubmitRef.current = ref;
  };

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const navigate = useNavigate();

  const createGathering = trpc.gatherings.put.useMutation({
    onSuccess: (data) => {
      navigate(`/gathering/${data}`);
    },
  });

  // Handles setting the step
  const handleSetStep = (callback: (prevStep: number) => number) => {
    const step = callback(activeStep);

    // When navigating forward, we need to do form validation
    if (step > activeStep) {
      switch (activeStep) {
        case 0:
          // Validate the details form
          formSubmitRef.current();
          break;
        case 1:
          // Validate the possible dates form
          formSubmitRef.current();
          break;
        case 2:
          // Validate the time periods form
          formSubmitRef.current();
          break;
        case 3:
          // User hit finish, submit to the backend
          createGathering.mutate(gatheringFormData!);
          break;
        default:
          throw new Error('Invalid step');
      }
    } else {
      setActiveStep(step);
    }
  };

  // Gets the component for the current step
  const stepComponents = [
    <DetailsForm
      formData={details}
      setSubmitRef={setSubmitRef}
      onSuccessfulSubmit={(data) => {
        setDetails(data);
        setActiveStep((prevStep) => prevStep + 1);
      }}
    />,
    <PossibleDates
      formData={possibleDates}
      setSubmitRef={setSubmitRef}
      onSuccessfulSubmit={(data) => {
        setPossibleDates(data);
        setActiveStep((prevStep) => prevStep + 1);
      }}
    />,
    <TimePeriods
      possibleDates={possibleDates!}
      formData={timePeriods}
      setSubmitRef={setSubmitRef}
      onSuccessfulSubmit={(data) => {
        setTimePeriods(data);

        setGatheringFormData({
          name: details!.name,
          description: details?.description,
          timezone: details!.timezone,
          scheduleType: possibleDates!.type,
          allowedPeriods: [], // TODO: Implement this
        });
        setActiveStep((prevStep) => prevStep + 1);
      }}
    />,
    <Confirmation
      formData={gatheringFormData}
      setSubmitRef={setSubmitRef}
      onSuccessfulSubmit={(data) => {
        createGathering.mutate(data);
        setActiveStep((prevStep) => prevStep + 1);
      }}
    />,
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
