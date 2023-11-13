import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Container } from '@mui/system';

import CreateGatheringButton from '../../components/create-gathering-button/create-gathering-button';

export default function Homepage() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
      }}
    >
      <Typography variant="h1" align="center" color="text.primary">
        Plan2Gather
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary">
        Discover the lightning-speed hangout harmonizer
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingTop={2}
      >
        <CreateGatheringButton variant="homepage" />
      </Box>
    </Container>
  );
}
