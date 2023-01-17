import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'
import { StyledButton } from '../../components/StyledButton'
import { PALLET } from '../../stylings/pallet'

function Home() {
  return (
    <>
      <span
        style=
        {{
          marginTop: "21rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontSize: "300%"
        }}>
        Need a loan? Sign up for one now!
      </span>
      <div style=
        {{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: "4rem"
        }}>
        <Link to='/signup'
          style={{ textDecoration: "none", color: "#323232" }}>
          <StyledButton
            label="GET YOUR LOAN NOW!"
            buttonColor={PALLET.mountainDewLime}
            borderRadius="20px"
            style={{ fontWeight: "bold" }}
          />
        </Link>
      </div>
    </>
  )
}

export default Home