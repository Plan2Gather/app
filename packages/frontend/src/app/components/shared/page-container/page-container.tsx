import Container from '@mui/material/Container';

export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingY: 1.5,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      component="main"
    >
      {children}
    </Container>
  );
}
