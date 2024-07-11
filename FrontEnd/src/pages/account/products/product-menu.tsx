import { useEffect, useState } from "react";
import useApi from "../../../api/hooks/use-api.hook";
import ProfilePage from "../profile-page";
import { Box } from "@mui/material";
import productsApi from "../../../api/products.api";
import { IProduct } from "../../../api/interfaces/product/product.interface";
import IconButton from "../../../components/icon-button";
import { useNavigate } from "react-router-dom";

export default function ProductMenu() {
	const { fetchAsync } = useApi({ triggerPage: true });
	const [products, setProducts] = useState<IProduct[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchAsync({
			request: () => productsApi.getAllAsync(),
			onSuccess: (handler) => handler.do((res) => setProducts(res.body!)),
			onError: (handler) => handler.log().popup(),
		});
	}, []);
	return (
		<ProfilePage>
			<Box display={"flex"}>
				<Box>Добавить товар</Box>
				<IconButton
					iconName="add"
					onClick={() => navigate("/products/add")}
				/>
				<Box>
					{products?.map((product, index) => (
						<Box key={index}>{product.name}</Box>
					))}
				</Box>
			</Box>
		</ProfilePage>
	);
}
