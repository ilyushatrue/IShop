import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { theme } from "../styles/themeProvider";
import Router from "./router";

function App() {
	const sm = useMediaQuery("(min-width:600px)");
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router sm={sm}/>
		</ThemeProvider>
	);
}

export default App;
