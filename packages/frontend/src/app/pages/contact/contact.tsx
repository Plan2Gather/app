import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Contact() {
    const issueUrl =
        'https://github.com/cjlawson02/plan2gather/issues/new/choose';

    return (
        <>
            <Typography component="h1" variant="h3">
                Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
                Have a question, need support, want to report a bug, provide
                feedback, or request a new feature? The best way to get in touch
                with us is to create a GitHub issue:
            </Typography>
            <Container maxWidth="xl">
                <Button href={issueUrl} variant="contained">
                    Start a support request
                </Button>
            </Container>
            <ol>
                <li>
                    Visit our <Link href={issueUrl}>GitHub issues page</Link>
                </li>
                <li>Use the Contact Us template for your issue.</li>
                <li>Fill out the issue with your question or request.</li>
                <li>Submit the issue.</li>
            </ol>
            <Divider />
            <Typography variant="body1" paragraph>
                GitHub issues are ideal for bugs, feedback, feature requests,
                and basic help inquiries. However, if you have a specific use
                case that requires more detailed or private assistance, please
                contact us via email at{' '}
                <Link href="mailto:help@plan2gather.net">
                    help@plan2gather.net
                </Link>
                .
            </Typography>
            <Typography variant="body1" paragraph>
                We&apos;ll be happy to assist you with your specific needs via
                email. Please note that email responses may take longer compared
                to GitHub issue responses.
            </Typography>
            <Typography variant="body1" paragraph>
                For legal inquiries, please email us at{' '}
                <Link href="mailto:legal@plan2gather.net">
                    legal@plan2gather.net
                </Link>
                .
            </Typography>
        </>
    );
}
