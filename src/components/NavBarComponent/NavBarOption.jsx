import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, Typography } from "@mui/material";

/**
 * 
 * @param {{ title: string, classNameInfo: string, url: string, icon:JSX.Element, onOptionClicked: ()=> void}} props 
 * @returns 
 */
export function NavBarOption (props) {
  const { title, classNameInfo, url, icon, onOptionClicked } = props;
  return (
    <ListItemButton sx={{ mb: 2 }}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      { url ? (
        <Link to={url} className={classNameInfo} onClick={onOptionClicked}>{title}</Link>
      ) : (
        <Typography fontSize={"16px"} onClick={onOptionClicked}>{title}</Typography>
      )}
    </ListItemButton>
  )
}
