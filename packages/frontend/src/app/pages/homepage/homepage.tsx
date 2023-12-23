import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import CreateGatheringButton from '../../components/shared/buttons/create-gathering/create-gathering';

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
      <Typography component="h2" variant="h6" align="center" color="text.secondary">
        Discover the lightning-speed hangout harmonizer
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" paddingTop={2}>
        <CreateGatheringButton variant="homepage" />
      </Box>
    </Container>
  );
}
