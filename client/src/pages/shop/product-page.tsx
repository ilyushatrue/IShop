import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/page";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import { Button as MuiButton, Box, Grid, Icon, Paper } from "@mui/material";
import Image from "../../components/image";
import { useEffect, useState } from "react";
import useApi from "../../api/hooks/use-api.hook";
import productsApi from "../../api/endpoints/products.api";
import { IProduct } from "../../api/interfaces/product/product.interface";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";
import Button from "../../components/buttons/button";

export default function ProductPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { favoriteProducts, isAuthenticated } = useAppSelector(
		(state) => state.user
	);
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	const { screenSize } = useMediaQueryContext();
	const [product, setProduct] = useState<IProduct>();
	const { fetchAsync, isFetching } = useApi();
	const [addedToCart, setAddedToCart] = useState(false);
	const [isFavorite, setIsFavorite] = useState(() => {
		if (isAuthenticated) {
			return favoriteProducts.some((fp) => fp.id === id);
		} else {
			const storageFavoriteProducts =
				window.localStorage.getItem("favorite-products");
			if (storageFavoriteProducts) {
				const objects = JSON.parse(
					storageFavoriteProducts
				) as IProduct[];
				return objects.some((fp) => fp.id === id);
			}
		}
		return false;
	});

	useEffect(() => {
		if (!id) return;
		fetchAsync({
			request: productsApi.getByIdAsync(id),
			onError: (handler) => handler.log().popup().throw(),
			triggerPageLoader: true,
		})
			.catch((err) => {
				navigate("server-is-dead");
			})
			.then((res) => setProduct(res!.body));
	}, [id]);

	function addToCart() {
		console.log("addToCart");
		return;
		fetchAsync({
			request: productsApi.addToCartAsync(id!),
			onSuccess: (handler) =>
				handler.popup("Товар успешно добавлен в корзину!"),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		}).then(() => {
			setAddedToCart(true);
		});
	}

	return (
		<Page sx={{ mt: 2 }}>
			<Box
				sx={{
					display: "flex",
					width: "100%",
					gap: 2,
					borderRadius: "24px",
					boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
					padding: 2,
					minHeight: `calc(100vh - ${
						navbarHeight[screenSize] + 50
					}px)`,
					bgcolor: "white",
				}}
			>
				{!isFetching && product && (
					<Grid container>
						<Grid item xs={12} sm={4}>
							<Image imageId={product.imageId} size={"100%"} />
						</Grid>
						<Grid item xs={12} sm={4}>
							{product.name}
							{product.description}
						</Grid>
						<Grid item xs={12} sm={4}>
							<Paper
								elevation={2}
								sx={{
									display: "flex",
									flexDirection: "column",
									padding: 2,
								}}
							>
								<Box
									sx={{
										display: "flex",
										gap: 1,
									}}
								>
									<Button
										variant="contained"
										onClick={addToCart}
										sx={{
											width: "100%",
										}}
										startIcon={<Icon>shopping_cart</Icon>}
									>
										Добавить в карзину
									</Button>
									<MuiButton
										onClick={console.log}
										sx={{
											height: 60,
											bgcolor: "secondary.100",
											"&:hover": {
												bgcolor: "secondary.200",
											},
											borderRadius: 3,
										}}
									>
										<Icon
											fontSize="large"
											sx={{ color: "secondary.400" }}
										>
											{isFavorite
												? "favorite"
												: "favorite_outline"}
										</Icon>
									</MuiButton>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				)}
			</Box>
		</Page>
	);
}
