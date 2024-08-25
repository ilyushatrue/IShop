import Products from "./products";
import { IProduct } from "../../api/interfaces/product/product.interface";
import useApi from "../../api/hooks/use-api.hook";
import { useEffect, useState } from "react";
import productsApi from "../../api/endpoints/products.api";
import { useNavigate } from "react-router-dom";
import ShopPage from "./shop-page";

export default function Main() {
	const { fetchAsync } = useApi();
	const navigate = useNavigate();
	const [products, setProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		fetchAsync({
			request: productsApi.getAllAsync(1, 10),
			onSuccess: (handler) =>
				handler.do((res) => setProducts(res.body!.pageItems!)),
			onError: (handler) => handler.do(() => navigate("/not-found")),
			triggerPageLoader: true,
		});
	}, []);

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
		</ShopPage>
	);
}
