import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useRef } from 'react';
import { Theme } from '@mui/material/styles';
import {
    Availability,
    GatheringFormData,
    Weekday,
} from '@plan2gather/backend/types';
import { useNavigate } from 'react-router';
import StepperControls from './stepper-controls/stepper-controls';
import DetailsForm from './details-form/details-form';
import PossibleDates from './possible-dates-form/possible-dates-form';
import Confirmation from './confirmation/confirmation';
import TimePeriods from './time-periods/time-periods';
import { trpc } from '../../../trpc';
import useGatheringStepperFormData, {
    GatheringStepperFormData,
} from './gathering-creation.store';
import { DateRangeLuxon } from '../time-range-selections/time-range-picker/time-range-picker';

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

    const convertTimePeriodsToBackendDates = (
        tps: Partial<Record<Weekday, DateRangeLuxon[]>>
    ): Availability => {
        const result: Availability = {};

        Object.keys(tps).forEach((day) => {
            const timePeriods = tps[day as Weekday];
            if (timePeriods) {
                timePeriods.forEach((tp) => {
                    const start = tp.start?.toISO();
                    const end = tp.end?.toISO();
                    if (start && end) {
                        if (!result[day as Weekday]) {
                            result[day as Weekday] = [];
                        }
                        result[day as Weekday]!.push({
                            start,
                            end,
                        });
                    } else {
                        throw new Error('Invalid time period');
                    }
                });
            }
        });

        return result;
    };

    const transformToGatheringData = (
        data: GatheringStepperFormData
    ): GatheringFormData | null => {
        if (data.details && data.possibleDates) {
            const result = {
                name: data.details.name,
                description: data.details.description,
                timezone: data.details.timezone,
                allowedPeriods: convertTimePeriodsToBackendDates(
                    data.timePeriods
                ),
            };
            return result;
        }
        return null;
    };

    const steps = [
        'Details',
        'Possible Dates',
        'Time Periods',
        'Confirm Gathering',
    ];

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
                        throw new Error('Invalid data');
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
        <TimePeriods ref={formSubmitRef} />,
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
                            <StepContent>
                                {createContent(stepComponents[index])}
                            </StepContent>
                        )}
                    </Step>
                ))}
            </Stepper>
            {!isSmallScreen && createContent(stepComponents[activeStep])}
        </>
    );
}
