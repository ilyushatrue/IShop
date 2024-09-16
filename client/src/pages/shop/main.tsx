import Products from "./products";
import { IProduct } from "../../api/interfaces/product/product.interface";
import useApi from "../../api/hooks/use-api.hook";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopPage from "./shop-page";
import ShopPageMainBox from "./shop-page-main-box";
import ShopPageSideBox from "./shop-page-side-box";
import ProductsApi from "../../api/endpoints/products.api";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";

export default function Main() {
	const filterChangeRefetchTimeoutMs = 1500;
	const { fetchAsync } = useApi();
	const navigate = useNavigate();
	const [products, setProducts] = useState<IProduct[]>([]);
	const searchValue = useAppSelector((state) => state.global.searchValue);
	const currSearch = useRef("");

	const fetchData = useCallback(
		(search?: string) => {
			fetchAsync({
				request: ProductsApi.getAllAsync(1, 10, search ?? ""),
				onSuccess: (handler) => handler,
				onError: (handler) => handler.log().popup(),
				triggerPageLoader: true,
			})
				.then((res) => {
					const { pageItems } = res!.body!;
					setProducts(pageItems);
				})
				.catch(() => navigate("/not-found"));
		},
		[fetchAsync, navigate]
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

	return (
		<ShopPage>
			<ShopPageSideBox></ShopPageSideBox>
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
			</ShopPageMainBox>
		</ShopPage>
	);
}
