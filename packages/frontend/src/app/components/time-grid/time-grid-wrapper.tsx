import { UserAvailability } from '@plan2gather/backend/types';
import TimeGrid from './time-grid';
import { combineTimeSlots, parseListForTimeSlots } from './time-grid.helpers';

interface TimeGridWrapperProps {
  userAvailability: UserAvailability[];
}

export default function TimeGridWrapper({
  userAvailability,
}: TimeGridWrapperProps) {
  const { data, columnLabels, rowLabels } = parseListForTimeSlots(
    combineTimeSlots(userAvailability)
  );
  return (
    <TimeGrid data={data} columnLabels={columnLabels} rowLabels={rowLabels} />
  );
}
