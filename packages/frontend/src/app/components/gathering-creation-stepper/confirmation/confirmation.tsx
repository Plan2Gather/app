import Typography from '@mui/material/Typography';
import { forwardRef, useImperativeHandle } from 'react';
import GatheringDetails from '../../gathering-details/gathering-details';
import useGatheringStepperFormData from '../gathering-creation.store';

const Confirmation = forwardRef<unknown, unknown>((_none, ref) => {
  const { details, timePeriods } = useGatheringStepperFormData();

  useImperativeHandle(ref, () => ({
    submit: () => true,
  }));

  return (
    <>
      <Typography variant="h5">Confirm Gathering</Typography>
      <GatheringDetails
        gatheringData={{
          name: details!.name,
          description: details?.description,
          timezone: details!.timezone,
        }}
      />
      <Typography variant="h6">Time Periods</Typography>
      {Object.entries(timePeriods).map(([day, ranges]) => (
        <div key={day}>
          <Typography variant="h6">{day}</Typography>
          {ranges.map((range) => (
            <Typography key={range.id} variant="body1">
              {range.start?.toFormat("HH':'mm")} -{' '}
              {range.end?.toFormat("HH':'mm")}
            </Typography>
          ))}
        </div>
      ))}
    </>
  );
});

export default Confirmation;
