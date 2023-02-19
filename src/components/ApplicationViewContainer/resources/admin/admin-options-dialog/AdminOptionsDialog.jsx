import {
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
	Button,
	Box,
	DialogActions,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	DialogContentText,
	styled,
} from '@mui/material';
import React, { useState } from 'react';
import { PALLET } from '../../../../../stylings/pallet';
import { ADMIN_OPTIONS_ACTION } from './admin-options-actions';

const StyledDialog = styled(Dialog)(() => ({
	'& .MuiPaper-root': {
		width: '100vw',
	},
}));
/**
 *
 * @param {{ onClose: () => void, open: boolean, onSubmit: ({ action: "mark_incomplete" | "mark_more_info_required" | "update_reject_reason", message?: string }) =>void}} props
 * @returns
 */
export function AdminOptionsDialog(props) {
	const { onClose, open, onSubmit } = props;
	const [messageText, setMessageText] = useState('');
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [applicationStatusValue, setApplicationStatusValue] = useState(null);
	const handleClose = () => {
		setApplicationStatusValue(null);
		onClose && onClose();
	};

	const handleSubmit = () => {
		// Double confirm cancellation
		if (applicationStatusValue !== ADMIN_OPTIONS_ACTION.AdminCancel) {
			onSubmit &&
				onSubmit({ action: applicationStatusValue, message: messageText });
		} else {
			setConfirmDialogOpen(true);
		}
	};

	const handleConfirmationDialogAction = () => {
		// This appear when user is cancelling an application
		onSubmit &&
			onSubmit({ action: applicationStatusValue, message: messageText });
	};

	const handleAdminActionSelectChange = (e) => {
		setApplicationStatusValue(e.target.value);
	};
	return (
		<StyledDialog onClose={handleClose} open={open}>
			<DialogTitle>Take an Admin action on this application</DialogTitle>
			<DialogContent>
				<Box component="form">
					<DialogContentText mb={3}>
						Select an action to be taken on this application
					</DialogContentText>
					<FormControl fullWidth>
						<InputLabel id="admin-action-label">Action</InputLabel>
						<Select
							labelId="admin-action-label"
							id="admin-action-select"
							value={applicationStatusValue}
							label="Action"
							onChange={handleAdminActionSelectChange}
						>
							<MenuItem value={null}></MenuItem>
							<MenuItem value={ADMIN_OPTIONS_ACTION.MarkIncomplete}>
								Mark as Incomplete
							</MenuItem>
							<MenuItem value={ADMIN_OPTIONS_ACTION.MoreInfoRequired}>
								More Info Required
							</MenuItem>
							<MenuItem value={ADMIN_OPTIONS_ACTION.UpdateRejectReason}>
								Update Reject Reason
							</MenuItem>
							<MenuItem value={ADMIN_OPTIONS_ACTION.AdminCancel}>
								Cancel Application
							</MenuItem>
						</Select>
					</FormControl>
					{applicationStatusValue && (
						<FormControl fullWidth>
							<TextField
								sx={{ width: '100%' }}
								type="text"
								name={'status-message-text'}
								label="More information (optional)"
								margin="normal"
								variant="outlined"
								color="secondary"
								value={messageText}
								onChange={(e) => setMessageText(e.target.value)}
								InputProps={{ maxLength: 125 }}
							/>
						</FormControl>
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color={'error'}
					disableElevation
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					sx={{ backgroundColor: PALLET.pineGreen }}
					disableElevation
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</DialogActions>
			<Dialog
				open={confirmDialogOpen}
				onClose={handleClose}
				aria-labelledby="confirm-dialog-title"
				aria-describedby="confirm-dialog-description"
			>
				<DialogTitle id="confirm-dialog-title">
					{'Cancel this application?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Do you want to cancel this application? This action cannot be
						undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button color="warning" onClick={() => setConfirmDialogOpen(false)}>
						No
					</Button>
					<Button onClick={handleConfirmationDialogAction} autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</StyledDialog>
	);
}
