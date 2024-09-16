import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/page";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import {
	Button as MuiButton,
	Box,
	Grid,
	Icon,
	Paper,
	Typography,
} from "@mui/material";
import Image from "../../components/image";
import { useEffect, useState } from "react";
import useApi from "../../api/hooks/use-api.hook";
import { IProduct } from "../../api/interfaces/product/product.interface";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";
import Button from "../../components/buttons/button";
import ProductsApi from "../../api/endpoints/products.api";
import { usePopup } from "../../app/hooks/use-popup.hook";

export default function ProductPage() {
	const { popupError, popupSuccess } = usePopup();
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
			request: ProductsApi.getByIdAsync(id),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		})
			.then((res) => setProduct(res.body))
			.catch((error: Error) => {
				console.log("Вы не аутентифицированы.",error)
				if(error.cause ===401){
					popupError("Вы не аутентифицированы.")
				}
			});
	}, [fetchAsync, id, navigate]);

	function addToCart() {
		fetchAsync({
			request: ProductsApi.addToCartAsync(id!),
			onSuccess: (handler) =>
				handler.popup("Товар успешно добавлен в корзину!"),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		})
			.then(() => {
				setAddedToCart(true);
			})
			.catch(() => {});
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
						<Grid item xs={12} sm={4} sx={{ paddingX: 2 }}>
							<Typography>{product.name}</Typography>
							<Typography
								sx={{
									wordWrap: "break-word",
								}}
							>
								{product.description}
							</Typography>
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
										disabled={addedToCart}
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
