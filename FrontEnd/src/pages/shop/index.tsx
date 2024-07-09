import React from "react";
import { Route, Routes } from "react-router-dom";
import Clothes from "./categories/clothes";
import Main from "./main";
import Electronics from "./categories/electronics";
import Yard from "./categories/yard";
import ChilrdenCare from "./categories/children-care";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";

export default function ShopCategoryRoutes() {

	// async function handleEditAsync(product: IProduct) {
	// 	setProductToEdit(undefined);
	// 	await fetchAsync({
	// 		request: async () => await productsApi.updateAsync(product),
	// 		onSuccess: (handler) => handler.popup("Товар успешно обновлен!").do(()=>{
				
	// 		}),
	// 		onError: (handler) => handler.log().popup(),
	// 	});
	// }

	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/clothes" element={<Clothes />} />
			<Route path="/electronics" element={<Electronics />} />
			<Route path="/yard" element={<Yard />} />
			<Route path="/children-care" element={<ChilrdenCare />} />
		</Routes>
	);
}
