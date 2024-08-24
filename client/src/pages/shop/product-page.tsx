import { useParams } from "react-router-dom";
import Page from "../../components/page";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import { Box, Button, Grid, Icon } from "@mui/material";
import Image from "../../components/image";
import { useEffect, useState } from "react";
import useApi from "../../api/hooks/use-api.hook";
import productsApi from "../../api/endpoints/products.api";
import { IProduct } from "../../api/interfaces/product/product.interface";
import { useMediaQueryContext } from "../../app/infrastructure/media-query-context";

export default function ProductPage() {
	const { id } = useParams();
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	const { screenSize } = useMediaQueryContext();
	const [product, setProduct] = useState<IProduct>();
	const { fetchAsync, isFetching } = useApi();

	useEffect(() => {
		if (!id) return;
		fetchAsync({
			request: () => productsApi.getByIdAsync(id),
			onSuccess: (handler) => handler.do((res) => setProduct(res.body!)),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		});
	}, [id]);

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
						<Grid item sx={{ flex: 1 }}>
							<Image imageId={product.imageId} size={"100%"} />
						</Grid>
						<Grid item sx={{ flex: 1 }}>
							{product.name}
							{product.description}
						</Grid>
						<Grid item sx={{ flex: 1 }}>
							<Button
								variant="contained"
								startIcon={<Icon>add</Icon>}
							>
								Добавить в карзину
							</Button>
						</Grid>
					</Grid>
				)}
			</Box>
		</Page>
	);
}
