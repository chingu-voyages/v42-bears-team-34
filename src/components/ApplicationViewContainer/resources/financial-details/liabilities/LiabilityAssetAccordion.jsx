import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreditLiabilityCard from "./credit/CreditLiabilityCard";
import MortgageLiabilityCard from "./mortgage/MortgageLiabilityCard";
import StudentLiabilityCard from "./student/StudentLiabilityCard";
/**
 * @param {{ summaryTitle: string, summarySubText: string, summaryTitleStyles: any  }} props 
 * @returns 
 */
function LiabilityAssetAccordion (props) {
  const { summaryTitle, summarySubText, summaryTitleStyles, assetType, liabilityArrayData } = props;
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${summarySubText}-content`}
          id={`${summarySubText}-header`}
        >
          <Typography sx={summaryTitleStyles}>
            {summaryTitle}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{summarySubText}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          { renderAssetType(assetType, liabilityArrayData) }
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

const renderAssetType = (assetType, arrayData) => {
  switch (assetType) {
    case "credit":
      return arrayData?.map((d) => (
        <CreditLiabilityCard {...{...d}}/>
      ));
    case "mortgage":
      return arrayData?.map((d) => (
        <MortgageLiabilityCard {...{...d}} />
      ))
    case "student":
      return arrayData?.map((d) => (
        <StudentLiabilityCard {...{...d}} />
      ))
    default:
      return null
  }
}

export default LiabilityAssetAccordion;
