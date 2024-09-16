import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useApi from "../../../api/hooks/use-api.hook";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import ProductsApi from "../../../api/endpoints/products.api";
import Products from "../products";
import ShopPage from "../shop-page";
import { Pagination, PaginationItem } from "@mui/material";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import ShopPageMainBox from "../shop-page-main-box";
import ShopPageSideBox from "../shop-page-side-box";
import ShopPageFilters from "../shop-page-filters";
import {
	ProductCategoryEnum,
	productCategoryEnumLink,
} from "../../../api/enums/product-category.enum";

export default function ChildrenCare() {
	const filterChangeRefetchTimeoutMs = 1500;
	const category = ProductCategoryEnum.ChildCare;
	const path = `/category/${productCategoryEnumLink[category]}/`;
	const searchValue = useAppSelector((state) => state.global.searchValue);
	const currSearch = useRef("");
	const { pageNum } = useParams();
	const navigate = useNavigate();
	const { fetchAsync } = useApi();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [pageProps, setPageProps] = useState<{
		totalPages: number;
		currentPage: number;
		pageSize: number;
	}>({ totalPages: 1, currentPage: 1, pageSize: 12 });
	const [fromPrice, setFromPrice] = useState(3000);
	const [toPrice, setToPrice] = useState(100_000);

	const fetchData = useCallback(
		(search?: string) => {
			fetchAsync({
				request: ProductsApi.getFilteredAsync({
					page: +pageNum!,
					pageSize: 10,
					categoryId: category,
					minPrice: fromPrice,
					maxPrice: toPrice,
					search: search ?? "",
				}),
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
		[category, fetchAsync, fromPrice, navigate, pageNum, toPrice]
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (currSearch.current !== searchValue) {
				fetchData(searchValue);
			}
			currSearch.current = searchValue;
		}, filterChangeRefetchTimeoutMs);

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

	const handlePriceRangeChange = ({
		min,
		max,
	}: {
		min: number;
		max: number;
	}) => {
		setFromPrice(min);
		setToPrice(max);
	};

	return (
		<ShopPage>
			<ShopPageSideBox>
				<ShopPageFilters
					onChange={handlePriceRangeChange}
					min={fromPrice}
					max={toPrice}
				/>
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
								to={`${path}${item.page ?? "1"}`}
								{...item}
							/>
						)}
					/>
				)}
			</ShopPageMainBox>
		</ShopPage>
	);
}
