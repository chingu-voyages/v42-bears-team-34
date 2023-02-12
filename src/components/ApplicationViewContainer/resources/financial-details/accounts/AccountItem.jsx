import { Box, Typography, Paper, styled } from "@mui/material";

const StyledAccountAttribute = styled(Paper)((props) => ({
  "&.MuiPaper-root": {
    boxShadow: "none",
  }
}))
const StyledAccountSubAttribute = styled(Paper)((props) => ({
  "&.MuiPaper-rounded": {
    padding: "10px"
  }
}))
// This will contain an account name, balance and available
// account name will be a bold title

const boldAttributeWeight = 600
/**
 * 
 * @param {{ account_id: string, name: string, balances: { available: number, current: number, iso_currency_code: string, limit: number }}} props 
 * @returns 
 */
export const AccountItem = (props) => {
  const { name, balances } = props;
  const { available, current, iso_currency_code, limit } = balances;
  return (
    <Box mb={0.5}>
      <Box maxWidth={"300px"}>
        <Box component={"header"}>
          <StyledAccountAttribute>
            <Typography fontWeight={"bold"}>
              {name}
            </Typography>
          </StyledAccountAttribute>
        </Box>
        <Box display="flex" justifyContent={"space-around"}>
          <StyledAccountAttribute>
            {/* Current balance */}
            <StyledAccountSubAttribute>
              <Typography fontWeight={boldAttributeWeight}>
                Current
              </Typography>
              <Typography>
                {`${"$" + current} ${iso_currency_code}`}
              </Typography>
            </StyledAccountSubAttribute>
          </StyledAccountAttribute>

          <StyledAccountAttribute>
            {/* Available balance */}
            <StyledAccountSubAttribute>
              <Typography fontWeight={boldAttributeWeight}>
                Available
              </Typography>
              <Typography>
                {`${available ? "$" + available : "-"} ${ available ? iso_currency_code : ""}`}
              </Typography>
            </StyledAccountSubAttribute>
          </StyledAccountAttribute>

          <StyledAccountAttribute>
            {/* Limit (if available )*/}
            <StyledAccountSubAttribute>
              <Typography fontWeight={boldAttributeWeight}>
                Limit
              </Typography>
              <Typography>
                {`${limit ? "$" + limit : "-"} ${ limit? iso_currency_code : ""}`}
              </Typography>
            </StyledAccountSubAttribute>
          </StyledAccountAttribute>

        </Box>
      </Box>
    </Box>
  )
}
