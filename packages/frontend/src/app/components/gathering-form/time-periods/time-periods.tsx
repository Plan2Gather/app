import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Theme, useMediaQuery } from '@mui/material';
import { DateTime } from 'luxon';
import { useForm } from 'react-hook-form';
import { Fragment, forwardRef, useImperativeHandle } from 'react';
import { FormContainer } from 'react-hook-form-mui';
import { Availability, Weekday } from '@plan2gather/backend/types';
import {
  convertBackendDatesToTimePeriods,
  convertTimePeriodsToBackendDates,
} from '@plan2gather/backend/utils';
import TimeRangeSelections from './time-range-selections/time-range-selections';

export interface TimePeriodsProps {
  initial: Availability;
  days: Weekday[];
  restrictions?: Availability;
  allowMultiple?: boolean;
  assumeFullDay?: boolean;
  timezone: string | undefined;
}

function DayHeaderCell({ day }: { day: Weekday }) {
  return <TableCell>{day.charAt(0).toUpperCase() + day.slice(1)}</TableCell>;
}

const TimePeriods = forwardRef<unknown, TimePeriodsProps>(
  (
    { initial, days, restrictions, timezone, allowMultiple, assumeFullDay },
    ref
  ) => {
    const initialValues = convertBackendDatesToTimePeriods(initial);
    const formContext = useForm<Record<string, DateTime>>({
      defaultValues: initialValues ?? {},
    });
    const isSmallScreen = useMediaQuery((theme: Theme) =>
      theme.breakpoints.down('sm')
    );

    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isFormValid = await new Promise<{
          valid: boolean;
          data?: Availability;
        }>((resolve) => {
          formContext.handleSubmit(
            (data) => {
              resolve({
                valid: true,
                data: assumeFullDay
                  ? convertTimePeriodsToBackendDates(data, days)
                  : convertTimePeriodsToBackendDates(data),
              });
            },
            () => resolve({ valid: false })
          )();
        });

        return isFormValid;
      },
    }));

    return (
      <FormContainer formContext={formContext}>
        <TableContainer>
          <Table>
            {isSmallScreen ? (
              days.map((day) => (
                <Fragment key={day}>
                  <TableHead>
                    <TableRow>
                      <DayHeaderCell day={day} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ verticalAlign: 'top' }}>
                      <TableCell>
                        <TimeRangeSelections
                          initial={initialValues ?? {}}
                          day={day}
                          restriction={restrictions?.[day]?.[0]}
                          timezone={timezone}
                          allowMultiple={allowMultiple ?? false}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Fragment>
              ))
            ) : (
              <>
                <TableHead>
                  <TableRow>
                    {days.map((day) => (
                      <DayHeaderCell key={day} day={day} />
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ verticalAlign: 'top' }}>
                    {days.map((day) => (
                      <TableCell key={day}>
                        <TimeRangeSelections
                          initial={initialValues ?? {}}
                          day={day}
                          restriction={restrictions?.[day]?.[0]}
                          timezone={timezone}
                          allowMultiple={allowMultiple ?? false}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </>
            )}
          </Table>
        </TableContainer>
      </FormContainer>
    );
  }
);

export default TimePeriods;

TimePeriods.defaultProps = {
  restrictions: undefined,
  allowMultiple: false,
  assumeFullDay: false,
};
