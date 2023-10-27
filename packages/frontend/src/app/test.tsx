import { trpc } from '../trpc';

export function Test() {
  const meetingPut = trpc.meetings.put.useMutation();

  return (
    <button
      onClick={() =>
        meetingPut.mutate({
          name: 'test',
          description: 'test description',
          timezone: 'America/Los_Angeles',
          allowedPeriods: {
            0: [
              {
                start: '2020-01-01T00:00:00Z',
                end: '2020-01-01T10:00:00Z',
              },
            ],
          },
        })
      }
    >
      click me
    </button>
  );
}
