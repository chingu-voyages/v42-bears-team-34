import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from '../../components/StyledButton';
import { PALLET } from '../../stylings/pallet';
import { SignupModal } from '../../components/SignupModal';
import './style.css';

function Home() {
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <span
        style={{
          marginTop: '21rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontSize: '300%',
        }}
      >
        Need a loan? Sign up for one now!
      </span>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: '4rem',
        }}
      >
        {/* This should bring up confirmation modal*/}
        <StyledButton
          label="GET YOUR LOAN NOW!"
          buttonColor={PALLET.mountainDewLime}
          borderRadius="20px"
          style={{ fontWeight: 'bold' }}
          onClick={() => setSignupModalOpen(true)}
        />
        <SignupModal
          open={signupModalOpen}
          onClose={() => setSignupModalOpen(false)}
          onConfirmModal={() => navigate('/signup', { replace: true })}
        />
      </div>
    </>
  );
}

export default Home;
