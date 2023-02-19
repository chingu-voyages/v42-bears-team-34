import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccountCard } from './AccountCard';

/**
 * @param {{ summaryTitle: string, summarySubText: string, summaryTitleStyles: any, accountsArray: any[]  }} props
 * @returns
 */
function AccountsAccordion(props) {
  const { summaryTitle, summarySubText, summaryTitleStyles, accountsArray } =
    props;
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${summarySubText}-content`}
          id={`${summarySubText}-header`}
        >
          <Typography sx={summaryTitleStyles}>{summaryTitle}</Typography>
          <Typography marginLeft="50%" sx={{ color: 'text.secondary' }}>
            {summarySubText}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {accountsArray &&
            accountsArray.map((account) => (
              <AccountCard key={account.account_id} {...{ ...account }} />
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccountsAccordion;
