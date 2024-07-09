import { useEffect, useState } from "react";
import Page from "../../../components/page";
import { useNavigate } from "react-router-dom";
import useApi from "../../../api/hooks/use-api.hook";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import productsApi from "../../../api/products.api";
import { Box, Typography } from "@mui/material";
import Products from "../products";

export default function Clothes() {
	const { fetchAsync, isFetching } = useApi();
	const navigate = useNavigate();
	const [products, setProducts] = useState<IProduct[]>();

	const categories = useAppSelector(
		(state) => state.global.productCategories
	);

	useEffect(() => {
		fetchAsync({
			request: () => productsApi.getAllAsync(1),
			onSuccess: (handler) => handler.do((res) => setProducts(res.body)),
			onError: (handler) => handler.do(() => navigate("/not-found")),
		});
	}, []);

	if (!products) return null;
	return (
		<Page isLoading={isFetching} sx={{ mt: 2 }}>
			<Box display={"flex"} gap={2}>
				<Box
					sx={{
						bgcolor: "white",
						borderRadius: "24px",
						padding: 2,
						width: 200,
					}}
				>
					<Typography>Цена </Typography>
					<Typography>от: </Typography>
					<Typography>до: </Typography>
				</Box>
				<Products
					products={products!}
					sx={{
						bgcolor: "white",
						borderRadius: "24px",
						padding: 2,
						width: 1200,
					}}
				/>
			</Box>
		</Page>
	);
}
