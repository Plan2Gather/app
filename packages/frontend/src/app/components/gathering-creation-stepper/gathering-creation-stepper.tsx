import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useMemo, useState, useRef } from 'react';
import { Container, StepContent, Theme, useMediaQuery } from '@mui/material';
import { MeetingFormDetails } from '@plan2gather/backend';
import StepperControls from './stepper-controls/stepper-controls';
import DetailsForm from './details-form/details-form';
import PossibleDates, {
  PossibleDateSelection,
} from './possible-dates-form/possible-dates-form';
import Confirmation from './confirmation/confirmation';

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
  const [details, setDetails] = useState<MeetingFormDetails | null>(null);

  // Keeps track of the periods
  const [possibleDates, setPossibleDates] =
    useState<PossibleDateSelection | null>(null);

  // Ref to the form submit function
  const formSubmitRef = useRef<() => Promise<void>>(async () => {});
  const setSubmitRef = (ref: () => Promise<void>) => {
    formSubmitRef.current = ref;
  };

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

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
          break;
        case 3:
          // User hit finish, submit to the backend
          // trpc.meetings.put.useMutation().mutate();
          break;
        default:
          throw new Error('Invalid step');
      }
    } else {
      setActiveStep(step);
    }
  };

  // Gets the component for the current step
  const stepComponent = useMemo(() => {
    switch (activeStep) {
      case 0:
        return (
          <DetailsForm
            formData={details}
            setSubmitRef={setSubmitRef}
            onSuccessfulSubmit={(data) => {
              setDetails(data);
              setActiveStep((prevStep) => prevStep + 1);
            }}
          />
        );
      case 1:
        return (
          <PossibleDates
            formData={possibleDates}
            setSubmitRef={setSubmitRef}
            onSuccessfulSubmit={(data) => {
              setPossibleDates(data);
              setActiveStep((prevStep) => prevStep + 1);
            }}
          />
        );
      case 2:
        return <div>Time Periods</div>;
      case 3:
        return <Confirmation />;
      default:
        throw new Error('Invalid step');
    }
  }, [activeStep, details, possibleDates]);

  const content = (
    <>
      <Container>{stepComponent}</Container>
      <StepperControls
        activeStep={activeStep}
        setActiveStep={handleSetStep}
        numSteps={steps.length}
      />
    </>
  );

  return (
    // TODO: fix mobile stepper
    <>
      <Stepper
        activeStep={activeStep}
        sx={{ paddingBottom: 2 }}
        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            {isSmallScreen && <StepContent>{content}</StepContent>}
          </Step>
        ))}
      </Stepper>
      {!isSmallScreen && content}
    </>
  );
}
