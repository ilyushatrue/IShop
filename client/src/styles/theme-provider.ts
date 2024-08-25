import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	components: {
		MuiPaper: {
			styleOverrides: {
				elevation1: {
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
				},
				elevation2: {
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
				},
				elevation3: {
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
				},
				elevation4: {
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
				},
				elevation5: {
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
				},
			},
		},
	},
	typography: {
		fontFamily: "Rubik",
	},
	palette: {
		primary: {
			"100": "rgb(235, 247, 255)",
			"200": "rgb(158, 209, 247)",
			"300": "rgb(125, 193, 245)",
			"400": "rgb(99, 176, 235)",
			"500": "rgb(79, 163, 227)",
			"600": "rgb(61, 147, 212)",
			"700": "rgb(45, 127, 189)",
			"800": "rgb(33, 113, 173)",
			"900": "rgb(29, 94, 143)",
			light: "rgb(79, 163, 227)",
			main: "rgb(45, 127, 189)",
			dark: "rgb(29, 94, 143)",
		},
		secondary: {
			"100": "rgb(252, 235, 230)",
			"200": "rgb(245, 195, 179)",
			"300": "rgb(242, 172, 150)",
			"400": "rgb(224, 137, 110)",
			"500": "rgb(194, 112, 87)",
			"600": "rgb(204, 86, 49)",
			"700": "rgb(196, 75, 37)",
			"800": "rgb(184, 68, 31)",
			"900": "rgb(156, 65, 37)",
			light: "rgb(194, 112, 87)",
			main: "rgb(196, 75, 37)",
			dark: "rgb(156, 65, 37)",
		},
	},
});
