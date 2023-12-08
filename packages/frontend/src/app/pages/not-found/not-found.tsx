import Typography from '@mui/material/Typography';

export default function NotFound() {
  return (
    <>
      <Typography component="h1" variant="h3">
        404 Not Found
      </Typography>
      <Typography>
        The requested page could not be found. Please check the URL and try
        again.
      </Typography>
    </>
  );
}
