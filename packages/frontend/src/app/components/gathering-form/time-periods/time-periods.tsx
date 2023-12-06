import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DateTime } from 'luxon';
import { useForm } from 'react-hook-form';
import { forwardRef, useImperativeHandle } from 'react';
import { FormContainer } from 'react-hook-form-mui';
import TimeRangeSelections from './time-range-selections/time-range-selections';

import useGatheringStepperFormData, {
  GatheringStepperFormData,
} from '../../gathering-creation-stepper/gathering-creation.store';

const TimePeriods = forwardRef<
  unknown,
  { initial: GatheringStepperFormData['timePeriods'] }
>(({ initial }, ref) => {
  const store = useGatheringStepperFormData();
  const days = store.possibleDates;

  const formContext = useForm<Record<string, DateTime>>({
    defaultValues: initial ?? {},
  });

  useImperativeHandle(ref, () => ({
    submit: async () => {
      const isFormValid = await new Promise<{
        valid: boolean;
        data?: Record<string, DateTime>;
      }>((resolve) => {
        formContext.handleSubmit(
          (data) => {
            resolve({ valid: true, data });
          },
          () => resolve({ valid: false })
        )();
      });

      return isFormValid;
    },
  }));

  return (
    <>
      <Typography variant="h5">Time Periods</Typography>
      <Typography variant="body1" paragraph>
        You may restrict time period for the possible dates. If you do not
        restrict the time period, the gathering will allow scheduling during the
        entire day.
      </Typography>
      <FormContainer formContext={formContext}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {days.map((day) => (
                  <TableCell key={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ verticalAlign: 'top' }}>
                {days.map((day) => (
                  <TableCell key={day}>
                    <TimeRangeSelections day={day} />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </FormContainer>
    </>
  );
});

export default TimePeriods;
