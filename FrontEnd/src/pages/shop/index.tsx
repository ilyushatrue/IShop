import Products from "./products";
import { IProduct } from "../../api/interfaces/product/product.interface";
import Page from "../../components/page";
import useApi from "../../api/hooks/use-api.hook";
import { useEffect, useState } from "react";
import productsApi from "../../api/products.api";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function Shop() {
	const { fetchAsync, isFetching } = useApi();
	const navigate = useNavigate();
	const [products, setProducts] = useState<IProduct[]>();

	useEffect(() => {
		fetchAsync({
			request: productsApi.getAllAsync,
			onSuccess: (handler) =>
				handler.do((res) => setProducts(res.body?.value)),
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
