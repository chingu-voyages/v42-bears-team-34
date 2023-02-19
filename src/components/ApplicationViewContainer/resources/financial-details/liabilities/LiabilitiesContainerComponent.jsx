import React from 'react';
import { Typography } from '@mui/material';
import LiabilityAssetAccordion from './LiabilityAssetAccordion';
import { STRING_HELPERS } from '../../../../../utils/string-helpers';
import { Box } from '@mui/material';
// Every liability asset will be an accordion, the contents of which...TBD
/**
 *
 * @param {{ liabilities: { credit?: any[], mortgage?: any[], student?: any[], title }}} props
 * @returns
 */
function LiabilitiesContainerComponent(props) {
  const { liabilities, title } = props;
  return (
    <Box mt={3}>
      {title && <Typography>{title}</Typography>}
      {liabilities &&
        Object.keys(liabilities).map((asset) => (
          <LiabilityAssetAccordion
            key={asset}
            summaryTitleStyles={{ fontWeight: 'bold' }}
            summaryTitle={STRING_HELPERS.capitalizeFirstLetter(asset)}
            liabilityArrayData={liabilities[asset]}
            assetType={asset}
          />
        ))}
    </Box>
  );
}

export default LiabilitiesContainerComponent;
