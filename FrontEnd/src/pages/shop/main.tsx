import Products from "./products";
import { IProduct } from "../../api/interfaces/product/product.interface";
import useApi from "../../api/hooks/use-api.hook";
import { useEffect, useState } from "react";
import productsApi from "../../api/products.api";
import { useNavigate } from "react-router-dom";
import ShopPage from "./shop-page";

export default function Main() {
	const { fetchAsync } = useApi({ triggerPage: true });
	const navigate = useNavigate();
	const [products, setProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		fetchAsync({
			request: () => productsApi.getAllAsync(),
			onSuccess: (handler) => handler.do((res) => setProducts(res.body!)),
			onError: (handler) => handler.do(() => navigate("/not-found")),
		});
	}, []);

	if (!products) return null;
	return (
		<ShopPage>
			<Products
				products={products!}
				onDelete={(id) =>
					setProducts((prev) => [...prev].filter((p) => p.id !== id))
				}
			/>
		</ShopPage>
	);
}
