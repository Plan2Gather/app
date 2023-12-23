import Button, { type ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

type LoadingButtonProps = {
  loading: boolean;
  children: React.ReactNode;
} & ButtonProps;

function LoadingButton({ loading, children, ...props }: LoadingButtonProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button {...props} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : children}
    </Button>
  );
}

export default LoadingButton;
