import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { theme } from "../styles/themeProvider";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Identity from "./identity";

function App() {
	const sm = useMediaQuery("(min-width:600px)");
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Identity>
					<BrowserRouter>
						<Router sm={sm} />
					</BrowserRouter>
				</Identity>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
