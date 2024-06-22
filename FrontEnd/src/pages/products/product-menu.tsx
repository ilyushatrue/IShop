import { useEffect, useState } from "react";
import useApi from "../../api/hooks/use-api.hook";
import ProfilePage from "../profile-page";
import { Box } from "@mui/material";
import productsApi from "../../api/products.api";
import { IProduct } from "../../api/interfaces/product/product.interface";
import IconButton from "../../components/icon-button";
import { useNavigate } from "react-router-dom";

export default function ProductMenu() {
	const { fetchAsync, isFetching } = useApi();
	const [products, setProducts] = useState<IProduct[]>();
	const navigate = useNavigate()

	useEffect(() => {
		fetchAsync({
			request: productsApi.getAllAsync,
			onSuccess: (handler) =>
				handler.do((res) => setProducts(res.body!.value)),
			onError: (handler) => handler.log().popup(),
		});
	}, []);

	if (!products || isFetching) return null;
	return (
		<ProfilePage>
			<Box>Добавить товар</Box>
			<IconButton iconName="add" onClick={()=>navigate("/products/add")}/>
			<Box>
				{products?.map((product) => (
					<Box>{product.name}</Box>
				))}
			</Box>
		</ProfilePage>
	);
}
