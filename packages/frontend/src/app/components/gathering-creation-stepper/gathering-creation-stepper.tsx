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
  gatheringFormDataSchema,
} from '@plan2gather/backend/types';
import { useNavigate } from 'react-router';
import StepperControls from './stepper-controls/stepper-controls';
import DetailsForm from './details-form/details-form';
import PossibleDates, {
  PossibleDateSelection,
} from './possible-dates-form/possible-dates-form';
import Confirmation from './confirmation/confirmation';
import { trpc } from '../../../trpc';

type GatheringStepperFormData = {
  details: GatheringFormDetails | null;
  possibleDates: PossibleDateSelection | null;
};

export default function GatheringCreationStepper() {
  // Keeps track of the current step in the stepper
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<GatheringStepperFormData>({
    details: null,
    possibleDates: null,
  });
  // Ref to the form submit function
  const formSubmitRef = useRef<{ submit: () => void }>();

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
      formSubmitRef.current?.submit();
    } else {
      setActiveStep(step);
    }
  };

  const handleNextStep = (newData: Partial<GatheringStepperFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setActiveStep((prevStep) => prevStep + 1);
  };

  const transformToGatheringData = (
    data: GatheringStepperFormData
  ): GatheringFormData | null => {
    if (data.details && data.possibleDates && data.possibleDates.data) {
      return {
        name: data.details.name,
        description: data.details.description,
        timezone: data.details.timezone,
        scheduleType: data.possibleDates.type,
        allowedPeriods: [],
      };
    }
    return null;
  };

  const steps = ['Details', 'Possible Dates', 'Confirm Gathering'];

  const stepComponents = [
    <DetailsForm
      formData={formData.details}
      ref={formSubmitRef}
      onSuccessfulSubmit={(data) => {
        handleNextStep({ details: data });
      }}
    />,
    <PossibleDates
      formData={formData.possibleDates}
      ref={formSubmitRef}
      onSuccessfulSubmit={(data) => handleNextStep({ possibleDates: data })}
    />,
    <Confirmation
      formData={transformToGatheringData(formData)}
      ref={formSubmitRef}
      onSuccessfulSubmit={() => {
        const data = transformToGatheringData(formData);
        if (data) {
          createGathering.mutate(gatheringFormDataSchema.parse(data));
        }
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
