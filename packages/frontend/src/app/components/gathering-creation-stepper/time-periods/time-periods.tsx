import Typography from '@mui/material/Typography';
import { Availability } from '@plan2gather/backend/types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DateTime } from 'luxon';
import TimeRangeSelections from '../../time-range-selections/time-range-selections';
import { PossibleDateSelection } from '../possible-dates-form/possible-dates-form';
import { FormStepProps } from '../types';
import { DateRangeLuxon } from '../../time-range-selections/time-range-picker/time-range-picker';

type TimePeriodsProps = FormStepProps<DateRangeLuxon[]> & {
  possibleDates: PossibleDateSelection;
};

export default function TimePeriods({
  possibleDates,
  formData,
  setSubmitRef,
  onSuccessfulSubmit,
}: TimePeriodsProps) {
  let days: string[] = [];

  if (possibleDates.type === 'date') {
    days = (possibleDates.data as DateTime[]).map(
      (date: DateTime) => date.toISODate()!
    );
  } else {
    days = possibleDates.data as string[];
  }

  // const formSubmitHandler = formContext.handleSubmit(onSuccessfulSubmit);

  // useEffect(() => {
  //   setSubmitRef(formSubmitHandler);
  // }, [setSubmitRef, formSubmitHandler]);

  return (
    <>
      <Typography variant="h5">Time Periods</Typography>
      <Typography variant="body1" paragraph>
        You may restrict time period for the possible dates. If you do not
        restrict the time period, the gathering will allow scheduling during the
        entire day.
      </Typography>
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
          <TableBody sx={{ verticalAlign: 'top' }}>
            {days.map((day) => (
              <TableCell key={day}>
                <TimeRangeSelections />
              </TableCell>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
