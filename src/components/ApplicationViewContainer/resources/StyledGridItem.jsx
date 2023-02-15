import { Typography } from "@mui/material"
import { CustomizedStyledGridItem } from "../../CustomStyledGridItem/CustomStyledGridItem";

export const StyledGridItem = (props) => {
  const { headerText, subText, subTextStyles } = props;
  return (
    <CustomizedStyledGridItem>
      <Typography fontWeight={"bold"} fontSize={"1rem"}>{headerText}</Typography>
      <Typography fontSize={"0.9rem"} sx={{ ...subTextStyles}}>{subText}</Typography>
    </CustomizedStyledGridItem>
  )
}
