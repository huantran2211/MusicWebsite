import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import { Link } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useLocation, Link as RouterLink } from "react-router-dom";
const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

export default function NavbarBreadcrumbs() {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const cleanSegment = (segment) => {
    // Nếu segment chứa chuỗi không hợp lệ như OID hoặc chuỗi hash-like
    if (/^[a-fA-F0-9]{32}$|OID/i.test(segment)) {
      return ""; // Bỏ qua đoạn này
    }

    const cleaned = segment.replace(/[^a-zA-Z0-9]/g, ""); 
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1); 
  };

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {pathSegments.map((segment, index) => {
        const pathToSegment = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const label = cleanSegment(segment);

        if (!label) return null;

        return index === pathSegments.length - 1 ? (
          <Typography
            key={pathToSegment}
            variant="body1"
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            {label}
          </Typography>
        ) : (
          <Link
            key={pathToSegment}
            component={RouterLink}
            to={pathToSegment}
            variant="body1"
            color="inherit"
            underline="hover"
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
