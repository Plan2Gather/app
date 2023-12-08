import { UserAvailability } from '@plan2gather/backend/types';
import TimeGrid from './time-grid';
import { combineTimeSlots, parseListForTimeSlots } from './time-grid.helpers';

interface TimeGridWrapperProps {
  userAvailability: UserAvailability[];
  requiredUsers: string[];
}

export default function TimeGridWrapper({
  userAvailability,
  requiredUsers,
}: TimeGridWrapperProps) {
  const { data, columnLabels, rowLabels } = parseListForTimeSlots(
    combineTimeSlots(userAvailability),
    requiredUsers
  );
  return (
    <TimeGrid data={data} columnLabels={columnLabels} rowLabels={rowLabels} />
  );
}
