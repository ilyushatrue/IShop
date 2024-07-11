import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useApi from "../../../api/hooks/use-api.hook";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import productsApi from "../../../api/endpoints/products.api";
import Products from "../products";
import ShopPage from "../shop-page";
import { Pagination, PaginationItem } from "@mui/material";

export default function Yard() {
	const path = "/category/yard/";
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { fetchAsync } = useApi({ triggerPage: true });
	const [products, setProducts] = useState<IProduct[]>([]);
	const [pageProps, setPageProps] = useState<{
		totalPages: number;
		currentPage: number;
		pageSize: number;
	}>({ totalPages: 1, currentPage: 1, pageSize: 12 });
	useEffect(() => {
		if (!id) {
			navigate("1");
			return;
		}
		fetchAsync({
			request: () => productsApi.getByCategoryAsync(3, +id, 12),
			onSuccess: (handler) =>
				handler.do((res) => {
					const { currentPage, pageItems, pageSize, totalPages } =
						res.body!;
					setProducts(pageItems);
					setPageProps({
						currentPage: currentPage,
						pageSize: pageSize,
						totalPages: totalPages,
					});
				}),
			onError: (handler) => handler.do(() => navigate("/not-found")),
		});
	}, [id]);

	function handleProductUpdate(product: IProduct) {
		const updatedProducts = [...products];
		const productIndex = products.findIndex((p) => p.id === product.id);
		updatedProducts[productIndex] = product;
		setProducts(updatedProducts);
	}
	return (
		<ShopPage>
			<Products
				onUpdate={handleProductUpdate}
				products={products!}
				onDelete={(id) =>
					setProducts((prev) => [...prev].filter((p) => p.id !== id))
				}
			/>
			<Pagination
				sx={{ display: "flex", justifyContent: "end" }}
				page={pageProps.currentPage}
				count={pageProps.totalPages}
				renderItem={(item) => (
					<PaginationItem
						component={Link}
						to={`${path}${item.page?.toString() ?? "1"}`}
						{...item}
					/>
				)}
			/>
		</ShopPage>
	);
}
