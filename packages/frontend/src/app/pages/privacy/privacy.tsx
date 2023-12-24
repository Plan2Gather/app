import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { type AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { type AccordionSummaryProps } from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import BulletedList from '@/app/components/shared/bulleted-list/bulleted-list';
import BulletedListItem from '@/app/components/shared/bulleted-list/bulleted-list-item/bulleted-list-item';

const Accordion = styled((props: AccordionProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Privacy() {
  return (
    <>
      <Typography component="h1" variant="h3" align="left" color="text.primary">
        Privacy Policy
      </Typography>
      <Typography variant="overline" gutterBottom>
        Last updated: November 03, 2023
      </Typography>
      <Typography gutterBottom>
        This Privacy Policy describes Our policies and procedures on the collection, use and
        disclosure of Your information when You use the Service and tells You about Your privacy
        rights and how the law protects You.
      </Typography>
      <Typography gutterBottom>
        We use Your Personal data to provide and improve the Service. By using the Service, You
        agree to the collection and use of information in accordance with this Privacy Policy.
      </Typography>
      <Divider />
      <Typography component="h3" variant="h5" gutterBottom>
        Summary of the policy
      </Typography>
      <BulletedList>
        <BulletedListItem>
          <strong>Data Collection & Cookies:</strong> We collect the necessary data for organizing
          gatherings and use cookies to match previous responses to users.
        </BulletedListItem>
        <BulletedListItem>
          <strong>Optional Email Feature:</strong> You have the option to use your email to receive
          a link to edit your availability or to invite others.
        </BulletedListItem>
        <BulletedListItem>
          <strong>Public Data:</strong> All gathering details and availabilities are publicly
          accessible, as anyone with the gathering link can view them.
        </BulletedListItem>
        <BulletedListItem>
          <strong>Data Deletion:</strong> Gathering data is automatically deleted after 90 days.
        </BulletedListItem>
        <BulletedListItem>
          <strong>Adaptive Policy:</strong> This policy is designed to be forward-looking, providing
          a broad framework that covers both our current services and any future enhancements. We
          are committed to evolving our privacy practices responsibly and transparently as our
          services grow.
        </BulletedListItem>
      </BulletedList>
      <Accordion>
        <AccordionSummary>Interpretation and Definitions</AccordionSummary>
        <AccordionDetails>
          <Typography component="h2" variant="h4" align="left" color="text.primary" gutterBottom>
            Interpretation
          </Typography>
          <Typography gutterBottom>
            The words of which the initial letter is capitalized have meanings defined under the
            following conditions. The following definitions shall have the same meaning regardless
            of whether they appear in singular or in plural.
          </Typography>
          <Typography component="h2" variant="h4" align="left" color="text.primary" gutterBottom>
            Definitions
          </Typography>
          <Typography>For the purposes of this Privacy Policy:</Typography>
          <BulletedList>
            <BulletedListItem>
              <strong>Account</strong> means a unique account created for You to access our Service
              or parts of our Service.
            </BulletedListItem>
            <BulletedListItem>
              <strong>Affiliate</strong> means an entity that controls, is controlled by or is under
              common control with a party, where &quot;control&quot; means ownership of 50% or more
              of the shares, equity interest or other securities entitled to vote for election of
              directors or other managing authority.
            </BulletedListItem>
            <BulletedListItem>
              <strong>Company</strong> (referred to as either &quot;the Company&quot;,
              &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to
              Plan2Gather.
            </BulletedListItem>
            <BulletedListItem>
              <strong>Cookies</strong> are small files that are placed on Your computer, mobile
              device or any other device by a website, containing the details of Your browsing
              history on that website among its many uses.
            </BulletedListItem>
            <BulletedListItem>
              <strong>Country</strong> refers to: California, United States
            </BulletedListItem>
            <BulletedListItem>
              <strong>Device</strong> means any device that can access the Service such as a
              computer, a cellphone or a digital tablet.
            </BulletedListItem>
            <BulletedListItem>
              <strong>Personal Data</strong> is any information that relates to an identified or
              identifiable individual.
            </BulletedListItem>
            <BulletedListItem>
              <strong>Service</strong> refers to the Website.
            </BulletedListItem>
            <BulletedListItem>
              <strong>Service Provider</strong> means any natural or legal person who processes the
              data on behalf of the Company. It refers to third-party companies or individuals
              employed by the Company to facilitate the Service, to provide the Service on behalf of
              the Company, to perform services related to the Service or to assist the Company in
              analyzing how the Service is used.
            </BulletedListItem>
            <BulletedListItem>
              <strong>Usage Data</strong> refers to data collected automatically, either generated
              by the use of the Service or from the Service infrastructure itself (for example, the
              duration of a page visit).
            </BulletedListItem>
            <BulletedListItem>
              <strong>Website</strong> refers to Plan2Gather, accessible from{' '}
              <Link href="/">https://plan2gather.net</Link>
            </BulletedListItem>
            <BulletedListItem>
              <strong>You</strong> means the individual accessing or using the Service, or the
              company, or other legal entity on behalf of which such individual is accessing or
              using the Service, as applicable.
            </BulletedListItem>
          </BulletedList>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Collecting and Using Your Personal Data</AccordionSummary>
        <AccordionDetails>
          <Typography component="h2" variant="h4" align="left" color="text.primary" gutterBottom>
            Types of Data Collected
          </Typography>
          <Typography component="h3" variant="h5" align="left" color="text.primary" gutterBottom>
            Personal Data
          </Typography>
          <Typography>
            While using Our Service, We may ask You to provide Us with certain personally
            identifiable information that can be used to contact or identify You. Personally
            identifiable information may include, but is not limited to:
          </Typography>
          <BulletedList>
            <BulletedListItem>Email address</BulletedListItem>
            <BulletedListItem>First name and last name</BulletedListItem>
            <BulletedListItem>Timezone or Coarse Location</BulletedListItem>
            <BulletedListItem>Usage Data</BulletedListItem>
          </BulletedList>
          <Typography component="h3" variant="h5" align="left" color="text.primary" gutterBottom>
            Usage Data
          </Typography>
          <Typography gutterBottom>
            Usage Data is collected automatically when using the Service.
          </Typography>
          <Typography gutterBottom>
            Usage Data may include information such as Your Device&apos;s Internet Protocol address
            (e.g. IP address), browser type, browser version, the pages of our Service that You
            visit, the time and date of Your visit, the time spent on those pages, unique device
            identifiers and other diagnostic data.
          </Typography>
          <Typography gutterBottom>
            When You access the Service by or through a mobile device, We may collect certain
            information automatically, including, but not limited to, the type of mobile device You
            use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile
            operating system, the type of mobile Internet browser You use, unique device identifiers
            and other diagnostic data.
          </Typography>
          <Typography gutterBottom>
            We may also collect information that Your browser sends whenever You visit our Service
            or when You access the Service by or through a mobile device.
          </Typography>
          <Typography component="h3" variant="h5" align="left" color="text.primary" gutterBottom>
            Tracking Technologies and Cookies
          </Typography>
          <Typography>
            We use Cookies and similar tracking technologies to track the activity on Our Service
            and store certain information. Tracking technologies used are beacons, tags, and scripts
            to collect and track information and to improve and analyze Our Service. The
            technologies We use may include:
          </Typography>
          <BulletedList>
            <BulletedListItem>
              <strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your
              Device. You can instruct Your browser to refuse all Cookies or to indicate when a
              Cookie is being sent. However, if You do not accept Cookies, You may not be able to
              use some parts of our Service. Unless you have adjusted Your browser setting so that
              it will refuse Cookies, our Service may use Cookies.
            </BulletedListItem>
            <BulletedListItem>
              <strong>Web Beacons.</strong> Certain sections of our Service and our emails may
              contain small electronic files known as web beacons (also referred to as clear gifs,
              pixel tags, and single-pixel gifs) that permit the Company, for example, to count
              users who have visited those pages or opened an email and for other related website
              statistics (for example, recording the popularity of a certain section and verifying
              system and server integrity).
            </BulletedListItem>
          </BulletedList>
          <Typography>
            Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies
            remain on Your personal computer or mobile device when You go offline, while Session
            Cookies are deleted as soon as You close Your web browser. Learn more about cookies on
            the{' '}
            <Link href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking">
              Privacy Policies website
            </Link>{' '}
            article.
          </Typography>
          <Typography>
            We use both Session and Persistent Cookies for the purposes set out below:
          </Typography>
          <BulletedList>
            <BulletedListItem>
              <strong>Necessary / Essential Cookies</strong>
              <Typography>Type: Session Cookies</Typography>
              <Typography>Administered by: Us</Typography>
              <Typography>
                Purpose: These Cookies are essential to provide You with services available through
                the Website and to enable You to use some of its features. They help to authenticate
                users and prevent fraudulent use of user accounts. Without these Cookies, the
                services that You have asked for cannot be provided, and We only use these Cookies
                to provide You with those services.
              </Typography>
            </BulletedListItem>
            <BulletedListItem>
              <strong>Cookies Policy / Notice Acceptance Cookies</strong>

              <Typography>Type: Persistent Cookies</Typography>
              <Typography>Administered by: Us</Typography>
              <Typography>
                Purpose: These Cookies identify if users have accepted the use of cookies on the
                Website.
              </Typography>
            </BulletedListItem>
            <BulletedListItem>
              <strong>Functionality Cookies</strong>
              <Typography>Type: Persistent Cookies</Typography>
              <Typography>Administered by: Us</Typography>
              <Typography>
                Purpose: These Cookies allow us to remember choices You make when You use the
                Website, such as remembering your login details or language preference. The purpose
                of these Cookies is to provide You with a more personal experience and to avoid You
                having to re-enter your preferences every time You use the Website.
              </Typography>
            </BulletedListItem>
          </BulletedList>
          <Typography gutterBottom>
            For more information about the cookies we use and your choices regarding cookies, please
            visit our Cookies Policy or the Cookies section of our Privacy Policy.
          </Typography>
          <Typography component="h2" variant="h4" align="left" color="text.primary" gutterBottom>
            Use of Your Personal Data
          </Typography>
          <Typography>The Company may use Personal Data for the following purposes:</Typography>
          <BulletedList>
            <BulletedListItem>
              <strong>To provide and maintain our Service</strong>, including to monitor the usage
              of our Service.
            </BulletedListItem>
            <BulletedListItem>
              <strong>To manage Your Account:</strong> to manage Your registration as a user of the
              Service. The Personal Data You provide can give You access to different
              functionalities of the Service that are available to You as a registered user.
            </BulletedListItem>
            <BulletedListItem>
              <strong>For the performance of a contract:</strong> the development, compliance and
              undertaking of the purchase contract for the products, items or services You have
              purchased or of any other contract with Us through the Service.
            </BulletedListItem>
            <BulletedListItem>
              <strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or
              other equivalent forms of electronic communication, such as a mobile
              application&apos;s push notifications regarding updates or informative communications
              related to the functionalities, products or contracted services, including the
              security updates, when necessary or reasonable for their implementation.
            </BulletedListItem>
            <BulletedListItem>
              <strong>To manage Your requests:</strong> To attend and manage Your requests to Us.
            </BulletedListItem>
          </BulletedList>
          <Typography>
            We may share Your personal information in the following situations:
          </Typography>
          <BulletedList>
            <BulletedListItem>
              <strong>With other users:</strong> when You share personal information or otherwise
              interact in the public areas with other users, such information may be viewed by all
              users and may be publicly distributed outside.
            </BulletedListItem>
            <BulletedListItem>
              <strong>With Your consent</strong>: We may disclose Your personal information for any
              other purpose with Your consent.
            </BulletedListItem>
          </BulletedList>
          <Typography component="h2" variant="h4" align="left" color="text.primary" gutterBottom>
            Retention of Your Personal Data
          </Typography>
          <Typography gutterBottom>
            The Company will retain Your Personal Data only for as long as is necessary for the
            purposes set out in this Privacy Policy. We will retain and use Your Personal Data to
            the extent necessary to comply with our legal obligations (for example, if we are
            required to retain your data to comply with applicable laws), resolve disputes, and
            enforce our legal agreements and policies.
          </Typography>
          <Typography gutterBottom>
            The Company will also retain Usage Data for internal analysis purposes. Usage Data is
            generally retained for a shorter period of time, except when this data is used to
            strengthen the security or to improve the functionality of Our Service, or We are
            legally obligated to retain this data for longer time periods.
          </Typography>
          <Typography component="h2" variant="h4" align="left" color="text.primary" gutterBottom>
            Transfer of Your Personal Data
          </Typography>
          <Typography gutterBottom>
            Your information, including Personal Data, is processed at the Company&apos;s operating
            offices and in any other places where the parties involved in the processing are
            located. It means that this information may be transferred to — and maintained on —
            computers located outside of Your state, province, country or other governmental
            jurisdiction where the data protection laws may differ than those from Your
            jurisdiction.
          </Typography>
          <Typography gutterBottom>
            Your consent to this Privacy Policy followed by Your submission of such information
            represents Your agreement to that transfer.
          </Typography>
          <Typography gutterBottom>
            The Company will take all steps reasonably necessary to ensure that Your data is treated
            securely and in accordance with this Privacy Policy and no transfer of Your Personal
            Data will take place to an organization or a country unless there are adequate controls
            in place including the security of Your data and other personal information.
          </Typography>
          <Typography component="h2" variant="h4" align="left" color="text.primary" gutterBottom>
            Delete Your Personal Data
          </Typography>
          <Typography gutterBottom>
            You have the right to delete or request that We assist in deleting the Personal Data
            that We have collected about You.
          </Typography>
          <Typography gutterBottom>
            Our Service may give You the ability to delete certain information about You from within
            the Service.
          </Typography>
          <Typography gutterBottom>
            You may update, amend, or delete Your information at any time by signing in to Your
            Account, if you have one, and visiting the account settings section that allows you to
            manage Your personal information. You may also contact Us to request access to, correct,
            or delete any personal information that You have provided to Us.
          </Typography>
          <Typography gutterBottom>
            Please note, however, that We may need to retain certain information when we have a
            legal obligation or lawful basis to do so.
          </Typography>
          <Typography component="h2" variant="h4" align="left" color="text.primary" gutterBottom>
            Disclosure of Your Personal Data
          </Typography>
          <Typography component="h3" variant="h5" align="left" color="text.primary" gutterBottom>
            Business Transactions
          </Typography>
          <Typography gutterBottom>
            If the Company is involved in a merger, acquisition or asset sale, Your Personal Data
            may be transferred. We will provide notice before Your Personal Data is transferred and
            becomes subject to a different Privacy Policy.
          </Typography>
          <Typography component="h3" variant="h5" align="left" color="text.primary" gutterBottom>
            Law enforcement
          </Typography>
          <Typography gutterBottom>
            Under certain circumstances, the Company may be required to disclose Your Personal Data
            if required to do so by law or in response to valid requests by public authorities (e.g.
            a court or a government agency).
          </Typography>
          <Typography component="h3" variant="h5" align="left" color="text.primary" gutterBottom>
            Other legal requirements
          </Typography>
          <Typography gutterBottom>
            The Company may disclose Your Personal Data in the good faith belief that such action is
            necessary to:
          </Typography>
          <BulletedList>
            <BulletedListItem>Comply with a legal obligation</BulletedListItem>
            <BulletedListItem>
              Protect and defend the rights or property of the Company
            </BulletedListItem>
            <BulletedListItem>
              Prevent or investigate possible wrongdoing in connection with the Service
            </BulletedListItem>
            <BulletedListItem>
              Protect the personal safety of Users of the Service or the public
            </BulletedListItem>
            <BulletedListItem>Protect against legal liability</BulletedListItem>
          </BulletedList>
          <Typography component="h2" variant="h4" align="left" color="text.primary" gutterBottom>
            Security of Your Personal Data
          </Typography>
          <Typography>
            The security of Your Personal Data is important to Us, but remember that no method of
            transmission over the Internet, or method of electronic storage is 100% secure. While We
            strive to use commercially acceptable means to protect Your Personal Data, We cannot
            guarantee its absolute security.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Children&apos;s Privacy</AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            Our Service does not address anyone under the age of 13. We do not knowingly collect
            personally identifiable information from anyone under the age of 13. If You are a parent
            or guardian and You are aware that Your child has provided Us with Personal Data, please
            contact Us. If We become aware that We have collected Personal Data from anyone under
            the age of 13 without verification of parental consent, We take steps to remove that
            information from Our servers.
          </Typography>
          <Typography>
            If We need to rely on consent as a legal basis for processing Your information and Your
            country requires consent from a parent, We may require Your parent&apos;s consent before
            We collect and use that information.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Links to Other Websites</AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            Our Service may contain links to other websites that are not operated by Us. If You
            click on a third party link, You will be directed to that third party&apos;s site. We
            strongly advise You to review the Privacy Policy of every site You visit.
          </Typography>
          <Typography>
            We have no control over and assume no responsibility for the content, privacy policies
            or practices of any third party sites or services.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Changes to this Privacy Policy</AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            We may update Our Privacy Policy from time to time. We will notify You of any changes by
            posting the new Privacy Policy on this page.
          </Typography>
          <Typography gutterBottom>
            We will let update the &quot;Last updated&quot; date at the top of this Privacy Policy.
          </Typography>
          <Typography>
            You are advised to review this Privacy Policy periodically for any changes. Changes to
            this Privacy Policy are effective when they are posted on this page.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Typography component="h2" variant="h5" align="left" color="text.primary" gutterBottom>
        Contact Us
      </Typography>
      <Typography>
        If you have any questions about this Privacy Policy, You can contact us by email:{' '}
        <Link href="mailto:legal@plan2gather.net">legal@plan2gather.net</Link>
      </Typography>
    </>
  );
}
