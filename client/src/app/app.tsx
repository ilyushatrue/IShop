import "../assets/fonts/fonts.css";
import "../extension-methods/array.extensions";
import "../extension-methods/string.extensions";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme-provider";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Identity from "./identity";
import { PopupProvider } from "../components/popup";
import { MediaQueryProvider } from "./infrastructure/media-query-context";

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalStyles
					styles={{
						html: {
							overflowY: "scroll",
						},
					}}
				/>
				<PopupProvider>
					<Identity>
						<BrowserRouter>
							<MediaQueryProvider>
								<Router />
							</MediaQueryProvider>
						</BrowserRouter>
					</Identity>
				</PopupProvider>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
