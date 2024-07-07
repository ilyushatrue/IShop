import "../assets/fonts/fonts.scss";
import "../extension-methods/array.extensions";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { theme } from "../styles/theme-provider";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Identity from "./identity";
import { PopupProvider } from "../components/popup";

function App() {
	const sm = useMediaQuery("(min-width:600px)");
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Identity>
					<PopupProvider>
						<BrowserRouter>
							<Router sm={sm} />
						</BrowserRouter>
					</PopupProvider>
				</Identity>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
