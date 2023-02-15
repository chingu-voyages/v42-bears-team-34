import { Box, Typography } from "@mui/material"
import { PALLET } from "../../../stylings/pallet"

export const NoInformationFound = ({ title }) => {
  return (
    <Box>
      <Typography sx={{ color: "black"}} textAlign={"center"} fontSize={"20px"}>{title}</Typography>
    </Box>
  )
}
