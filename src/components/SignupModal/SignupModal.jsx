import React, { useCallback } from 'react';
import { Modal } from '@mui/material';

import DisclaimerConfirmationComponent from '../disclaimer-confirmation/DisclaimerConfirmationComponent';

function SignupModal(props) {
  const handleConfirmModal = useCallback(() => {
    // User confirms our terms
    props.onConfirmModal && props.onConfirmModal();
  }, []);

  const handleDeclineModal = useCallback(() => {
    // User declines our terms
    props.onClose && props.onClose();
  });
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DisclaimerConfirmationComponent
          handleConfirm={handleConfirmModal}
          handleDecline={handleDeclineModal}
        />
      </Modal>
    </div>
  );
}

export default SignupModal;
