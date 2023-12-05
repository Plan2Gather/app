import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Weekday } from '@plan2gather/backend/types';
import { createRef, forwardRef, useImperativeHandle, useRef } from 'react';
import TimeRangeSelections from '../../time-range-selections/time-range-selections';

import useGatheringStepperFormData from '../gathering-creation.store';

const TimePeriods = forwardRef<unknown, unknown>((_none, ref) => {
    const store = useGatheringStepperFormData();
    const days = store.possibleDates;

    const selectionRefs = useRef(
        days.reduce(
            (acc, day) => {
                acc[day] = createRef();
                return acc;
            },
            {} as Record<
                Weekday,
                React.RefObject<{ submit: () => Promise<boolean> }>
            >
        )
    );

    useImperativeHandle(ref, () => ({
        submit: async () => {
            const isFormValid = await new Promise((resolve) => {
                const promises = days.map(
                    (day) => selectionRefs.current[day].current?.submit()
                );

                Promise.all(promises).then((results) => {
                    if (results.every((result) => result)) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });

            return isFormValid;
        },
    }));

    return (
        <>
            <Typography variant="h5">Time Periods</Typography>
            <Typography variant="body1" paragraph>
                You may restrict time period for the possible dates. If you do
                not restrict the time period, the gathering will allow
                scheduling during the entire day.
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
                    <TableBody>
                        <TableRow sx={{ verticalAlign: 'top' }}>
                            {days.map((day) => (
                                <TableCell key={day}>
                                    <TimeRangeSelections
                                        ref={selectionRefs.current[day]}
                                        day={day}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
});

export default TimePeriods;
