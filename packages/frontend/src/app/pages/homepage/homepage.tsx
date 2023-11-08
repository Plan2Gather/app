import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';

export default function Homepage() {
  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Plan2Gather
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        component="p"
      >
        Discover the lightning-speed hangout harmonizer
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingTop={2}
      >
        <Button variant="contained" href="/meeting-creation">
          Get Started
        </Button>
      </Box>
    </>
  );
}
