import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SecurityIcon from '@mui/icons-material/Security';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 1,
  mb: 3,
};

export default function Values() {
  return (
    <Box component="section" sx={{ display: 'flex', overflow: 'hidden' }}>
      <Container
        sx={{
          mt: 5,
          mb: 10,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid container>
          <Grid xs={12} md={4}>
            <Box sx={item}>
              <EventAvailableIcon sx={{ fontSize: 40 }} />
              <Typography variant="h6" align="center" gutterBottom>
                Powerful Planning
              </Typography>
              <Typography variant="body1" align="center">
                Simplify the process of scheduling your gathering with our availability collection
                tool. Filter for required attendance, ensuring the presence of essential
                individuals.
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} md={4}>
            <Box sx={item}>
              <ScheduleIcon sx={{ fontSize: 40 }} />
              <Typography variant="h6" align="center" gutterBottom>
                Flexible Scheduling
              </Typography>
              <Typography variant="body1" align="center">
                Take control of your gathering&apos;s scheduling with powerful, flexible time
                restrictions. Organizers can predefine specific time frames (eg. 9 AM to 5 PM) to
                tailor the gathering within preferred hours.
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} md={4}>
            <Box sx={item}>
              <SecurityIcon sx={{ fontSize: 40 }} />
              <Typography variant="h6" align="center" gutterBottom>
                Privacy Centric
              </Typography>
              <Typography variant="body1" align="center">
                We automatically delete your data, eliminating the need for user accounts. Only
                those with access to the unique link can view the gathering&apos;s details, ensuring
                that your data is safe and secure.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Button href="/create" variant="outlined">
          Get Started
        </Button>
      </Container>
    </Box>
  );
}
