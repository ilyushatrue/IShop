import { CssBaseline, createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import NotFound from "./pages/NotFound/NotFound";
import NavBar from "./components/navigation/NavBar";
import Account from "./pages/Account/Account";
import Authentication from "./pages/Authentication/Authentication";

const theme = createTheme({
	palette: {
		primary: {
			light: "rgb(65, 148, 209)",
			main: "rgb(38, 116, 173)",
			dark: "rgb(29, 94, 143)",
		},
		secondary: {
			light: "rgb(194, 112, 87)",
			main: "rgb(196, 75, 37)",
			dark: "rgb(156, 65, 37)",
		},
	},
});

function App() {
	const sm = useMediaQuery("(min-width:600px)");
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<NavBar sm={sm}/>
			<Routes>
				<Route path="/page1" element={<Page1 />} />
				<Route path="/page2" element={<Page2 />} />
				<Route path="/account/*" element={<Account />} />
				<Route
					path="/login"
					element={<Authentication isRegistered sm={sm}/>}
				/>
				<Route path="/register" element={<Authentication isRegistered={false} sm={sm}/>} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
