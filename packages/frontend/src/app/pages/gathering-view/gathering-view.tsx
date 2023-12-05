import { useParams } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import GatheringDetails from '../../components/gathering-details/gathering-details';
import { trpc } from '../../../trpc';
import NotFound from '../not-found/not-found';

export default function GatheringView() {
    const { id } = useParams();

    if (!id) {
        return <NotFound />;
    }

    const { data, isLoading } = trpc.gatherings.get.useQuery({
        id,
    });

    return isLoading ? (
        <CircularProgress />
    ) : (
        <GatheringDetails gatheringData={data!} />
    );
}
