import "../assets/fonts/fonts.css";
import "../extension-methods/array.extensions";
import { CssBaseline, GlobalStyles, ThemeProvider, useMediaQuery } from "@mui/material";
import { theme } from "../styles/theme-provider";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Identity from "./identity";
import { PopupProvider } from "../components/popup";
import { MediaQueryProvider } from "./infrastructure/media-query-context";

function App() {
	const sm = useMediaQuery("(min-width:600px)");
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalStyles
					styles={{
						html: {
							backgroundColor: "white", // Белый фон для html
							height: "100%",
						},
						body: {
							backgroundColor: "white", // Белый фон для body
							height: "100%",
							margin: 0,
							padding: 0,
							overflowX: "hidden", // Скрыть горизонтальный скролл
						},
						"#root": {
							height: "100%", // Убедиться, что root занимает всю высоту
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
