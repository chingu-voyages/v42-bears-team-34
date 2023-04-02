import React, { useCallback, useContext } from 'react';
import { PlaidLinkContainer } from '../../../components/PlaidLinkWidget';
import AppContext from '../../../context/AppContext';
/**
 * The
 * @param {{ onLinkSuccess: () => void}} props
 * @returns
 */
export default function PlaidLinkPage(props) {
  const { linkToken } = useContext(AppContext);
  const { onLinkSuccess, onAbort } = props;
  const handleLinkSuccess = useCallback((itemId) => {
    // Do something with the success state. Maybe do a summary page or render an APPLY or DONE button?
    onLinkSuccess && onLinkSuccess(itemId);
  }, []);
  return (
    <PlaidLinkContainer
      prompt={'Click on the button below to link your financial information'}
      linkToken={linkToken}
      onPlaidSuccessComplete={handleLinkSuccess}
      onAbort={onAbort}
    />
  );
}
