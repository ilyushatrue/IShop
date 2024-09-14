import Products from "./products";
import { IProduct } from "../../api/interfaces/product/product.interface";
import useApi from "../../api/hooks/use-api.hook";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShopPage from "./shop-page";
import ShopPageFilters from "./shop-page-filters";
import ShopPageMainBox from "./shop-page-main-box";
import ShopPageSideBox from "./shop-page-side-box";
import ProductsApi from "../../api/endpoints/products.api";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";
import { Pagination, PaginationItem } from "@mui/material";

export default function Main() {
	const { fetchAsync } = useApi();
	const navigate = useNavigate();
	const [products, setProducts] = useState<IProduct[]>([]);
	const searchValue = useAppSelector((state) => state.global.searchValue);
	const currSearch = useRef("");
	const [pageProps, setPageProps] = useState<{
		totalPages: number;
		currentPage: number;
		pageSize: number;
	}>({ totalPages: 1, currentPage: 1, pageSize: 12 });

	const fetchData = useCallback(
		(search?: string) => {
			fetchAsync({
				request: ProductsApi.getAllAsync(1, 10, search ?? ""),
				onSuccess: (handler) => handler,
				onError: (handler) => handler.log().popup(),
				triggerPageLoader: true,
			})
				.then((res) => {
					const { currentPage, pageItems, pageSize, totalPages } =
						res!.body!;
					setProducts(pageItems);
					setPageProps({
						currentPage: currentPage,
						pageSize: pageSize,
						totalPages: totalPages,
					});
				})
				.catch(() => navigate("/not-found"));
		},
		[fetchAsync, navigate]
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		const timeoutMs = 1500;

		const timeout = setTimeout(() => {
			if (currSearch.current !== searchValue) {
				fetchData(searchValue);
			}
			currSearch.current = searchValue;
		}, timeoutMs);

		return () => {
			clearTimeout(timeout);
		};
	}, [fetchData, searchValue]);
	function handleProductUpdate(product: IProduct) {
		const updatedProducts = [...products];
		const productIndex = products.findIndex((p) => p.id === product.id);
		updatedProducts[productIndex] = product;
		setProducts(updatedProducts);
	}

	return (
		<ShopPage>
			<ShopPageSideBox>
				<ShopPageFilters />
			</ShopPageSideBox>
			<ShopPageMainBox>
				<Products
					onUpdate={handleProductUpdate}
					products={products!}
					onDelete={(id) =>
						setProducts((prev) =>
							[...prev].filter((p) => p.id !== id)
						)
					}
				/>
				{products.length > 0 && (
					<Pagination
						sx={{
							position: "absolute",
							bottom: 20,
							right: 10,
							display: "flex",
							justifyContent: "end",
						}}
						page={pageProps.currentPage}
						count={pageProps.totalPages}
						renderItem={(item) => (
							<PaginationItem
								component={Link}
								to={`/${item.page?.toString() ?? "1"}`}
								{...item}
							/>
						)}
					/>
				)}
			</ShopPageMainBox>
		</ShopPage>
	);
}
