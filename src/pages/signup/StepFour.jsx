import React from 'react'
import { Typography } from '@mui/material'

export default function StepFour() {
  return (
    <div>
        <Typography variant="h4" component="h2" align="center">
            Instant Bank Verification (IBV)
        </Typography>

        <Typography variant="body" component="p" align="center">
            To complete your credit application, we need to perform a real-time verification of your primary bank account <br/> (active and where your paychecks are deposited)
        </Typography>

        <Typography variant="h5" component="p" align="center">
            Login to your institution 
        </Typography>

        <Typography variant="body" component="p" align="center">
            Select an institution below to allow a secure connection
        </Typography>
    </div>
  )
}
