import { useParams } from 'react-router';
import { GatheringDetails } from '../../components/gathering-details/gathering-details';
import { trpc } from '../../../trpc';
import NotFound from '../not-found/not-found';

export default function GatheringView() {
  const { gatheringId } = useParams();

  if (!gatheringId) {
    return <NotFound />;
  }

  const { data: gatheringData } = trpc.gatherings.get.useQuery({
    id: gatheringId,
  });

  if (!gatheringData) {
    return <NotFound />;
  }

  return <GatheringDetails gatheringData={gatheringData} />;
}
