/* eslint-disable react/jsx-props-no-spreading */
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline';
import { DateTime } from 'luxon';
import { TimePickerElement, TimePickerElementProps } from 'react-hook-form-mui';
import { useState } from 'react';

export type DateRangeLuxon = {
    start: DateTime | null;
    end: DateTime | null;
    id: string;
};

interface TimeRangeProps {
    range: DateRangeLuxon;
    onRemove: () => void;
    timezone: string;
    namePrefix: string;
}

export default function TimeRangePicker({
    range,
    onRemove,
    timezone,
    namePrefix,
}: TimeRangeProps) {
    const timeSteps = { hours: 1, minutes: 15 };

    const [startTime, setStartTime] = useState(range.start);

    const timePickerProps = (
        name: 'start' | 'end'
    ): TimePickerElementProps => ({
        name: `${namePrefix}_${name}`,
        label: name === 'start' ? 'Start Time' : 'End Time',
        timeSteps,
        minutesStep: timeSteps.minutes,
        timezone,
        required: true,
    });

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', minWidth: 310 }}
        >
            <IconButton size="large" onClick={onRemove}>
                <RemoveCircleIcon fontSize="inherit" />
            </IconButton>
            <TimePickerElement
                {...timePickerProps('start')}
                onChange={setStartTime}
            />
            <Typography>&ndash;</Typography>
            <TimePickerElement
                {...timePickerProps('end')}
                minTime={startTime}
            />
        </Stack>
    );
}
