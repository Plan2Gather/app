import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { Container } from '@mui/system';

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
        <Button variant="contained" href="/create">
          Plan a Gathering
        </Button>
      </Box>
    </Container>
  );
}
