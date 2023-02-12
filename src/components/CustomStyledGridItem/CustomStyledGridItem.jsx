import { styled, Paper, Box, Typography } from "@mui/material";
const StyledGridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  "&.MuiPaper-root": {
    boxShadow: "none"
  }
}));

export const CustomizedStyledGridItem = (props) => {
  const { title } = props;
  return (
    <StyledGridItem>
      { title && (
        <Box>
          <Typography textAlign={"left"}>
            {title}
          </Typography>
        </Box>
      )}
      {...props.children}
    </StyledGridItem>
  )
}
