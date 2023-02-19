import React from 'react';
import { Box, Typography } from '@mui/material';

export const NoInformationFound = ({ title }) => {
	return (
		<Box>
			<Typography
				sx={{ color: 'black' }}
				textAlign={'center'}
				fontSize={'20px'}
			>
				{title}
			</Typography>
		</Box>
	);
};
