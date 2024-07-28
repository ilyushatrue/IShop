import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	typography: {
		fontFamily: 'Rubik Regular',
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
			light: "rgb(194, 112, 87)",
			main: "rgb(196, 75, 37)",
			dark: "rgb(156, 65, 37)",
		},
	},
});
