import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export interface ILinkTab {
  index: number;
  label?: string;
  href: string;
  onClick: (activeIndex: number) => void;
}
export default function LinkTab({ index, label, href, onClick }: ILinkTab) {
  return (
    <Link to={href}>
      <Button sx={{ padding: 2 }} onClick={() => onClick(index)}>
        {label}
      </Button>
    </Link>
  );
}
