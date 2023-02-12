import { Paper, styled, Typography } from "@mui/material"

const CustomizedStyledGridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  "&.MuiPaper-root": {
    boxShadow: "none"
  }
}));

export const StyledGridItem = (props) => {
  const { headerText, subText, subTextStyles } = props;
  return (
    <CustomizedStyledGridItem>
      <Typography fontWeight={"bold"} fontSize={"2rem"}>{headerText}</Typography>
      <Typography fontSize={"2rem"} sx={{ ...subTextStyles}}>{subText}</Typography>
    </CustomizedStyledGridItem>
  )
}
