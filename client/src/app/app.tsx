import "../assets/fonts/fonts.css";
import "../extension-methods/array.extensions";
import {
	CssBaseline,
	GlobalStyles,
	ThemeProvider,
	useMediaQuery,
} from "@mui/material";
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
						"html, body, .MuiPaper-root": {
							backgroundColor: "white",
							height: "100%",
							margin: 0,
							padding: 0,
							overflowX: "hidden", // Скрыть горизонтальную прокрутку
						},
					}}
				/>
				<Identity>
					<PopupProvider>
						<BrowserRouter>
							<MediaQueryProvider>
								<Router />
							</MediaQueryProvider>
						</BrowserRouter>
					</PopupProvider>
				</Identity>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
