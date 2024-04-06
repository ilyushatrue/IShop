import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export interface ILinkTab {
  index: number;
  isActive?: boolean;
  label?: string;
  href: string;
  onClick: (activeIndex: number) => void;
}
export default function LinkTab({
  index,
  label,
  href,
  onClick,
  isActive = false,
}: ILinkTab) {
  return (
    <Link to={href}>
      <Button
        sx={{
          padding: 2,
          justifyContent: "start",
          bgcolor: isActive ? "rgb(240, 245, 255)" : undefined,
        }}
        onClick={() => onClick(index)}
        fullWidth
      >
        {label}
      </Button>
    </Link>
  );
}
