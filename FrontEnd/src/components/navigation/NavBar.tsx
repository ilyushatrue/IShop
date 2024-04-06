import React, { useEffect, useState } from "react";
import NavTabs from "./tabs/NavTabs";
import { Box, Button, Collapse, useMediaQuery } from "@mui/material";
import { ArrowBack, Menu } from "@mui/icons-material";

const menuItems = [
  { label: "Главная", href: "/page1" },
  { label: "Дополнительная", href: "/page2" },
  { label: "Личный кабинет", href: "/account" },
];
export default function NavBar() {
  const sm = useMediaQuery("(min-width:600px)");
  const [isMenuCollapse, setIsMenuCollapse] = useState(sm ? false : true);

  function toggleMenuCollapse() {
    setIsMenuCollapse((prev) => !prev);
  }

  function handleTabChange(tabIndex: number) {
    setIsMenuCollapse(true);
  }

  useEffect(() => {
    if (sm) {
      setIsMenuCollapse(false);
    } else {
      setIsMenuCollapse(true);
    }
  }, [sm]);

  return (
    <>
      <Box height={54}>
        {!sm && (
          <Button sx={{ height: 54 }} onClick={toggleMenuCollapse}>
            <Menu />
          </Button>
        )}
      </Box>

      <Collapse
        in={!isMenuCollapse}
        orientation="horizontal"
        sx={{
          position: "fixed",
          top: 0,
          bottom: sm ? undefined : 0,
          left: sm ? 0 : undefined,
          right: sm ? 0 : undefined,
          zIndex: 2,
          bgcolor: sm ? undefined : "white",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={sm ? "row" : "column"}
          justifyContent={sm ? "end" : "start"}
        >
          {!sm && (
            <Button
              sx={{ height: 54, marginLeft: "auto" }}
              onClick={toggleMenuCollapse}
            >
              <ArrowBack />
            </Button>
          )}
          <NavTabs
            onChange={handleTabChange}
            menuItems={menuItems}
            orientation={sm ? "horizontal" : "vertical"}
          />
        </Box>
      </Collapse>
    </>
  );
}
