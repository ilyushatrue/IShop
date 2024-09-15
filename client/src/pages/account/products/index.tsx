import { Route, Routes } from "react-router-dom";
import ProductsMenu from "./products-menu";
import ProductEdit from "./product-edit/product-edit";
import { ProductCategoryEnum } from "../../../api/enums/product-category.enum";

export default function ProductRoutes() {
	return (
		<Routes>
			<Route
				path="/clothes"
				element={
					<ProductsMenu category={ProductCategoryEnum.Clothes} />
				}
			/>
			<Route
				path="/electronics"
				element={
					<ProductsMenu category={ProductCategoryEnum.Electronics} />
				}
			/>
			<Route
				path="/yard"
				element={<ProductsMenu category={ProductCategoryEnum.Yard} />}
			/>
			<Route
				path="/child-care"
				element={
					<ProductsMenu category={ProductCategoryEnum.ChildCare} />
				}
			/>
			<Route
				path="/clothes/add"
				element={<ProductEdit category={ProductCategoryEnum.Clothes} />}
			/>
			<Route
				path="/clothes/:id"
				element={<ProductEdit category={ProductCategoryEnum.Clothes} />}
			/>
			<Route
				path="/electronics/add"
				element={
					<ProductEdit category={ProductCategoryEnum.Electronics} />
				}
			/>
			<Route
				path="/electronics/:id"
				element={
					<ProductEdit category={ProductCategoryEnum.Electronics} />
				}
			/>
			<Route
				path="/yard/add"
				element={<ProductEdit category={ProductCategoryEnum.Yard} />}
			/>
			<Route
				path="/yard/:id"
				element={<ProductEdit category={ProductCategoryEnum.Yard} />}
			/>
			<Route
				path="/child-care/add"
				element={
					<ProductEdit category={ProductCategoryEnum.ChildCare} />
				}
			/>
			<Route
				path="/child-care/:id"
				element={
					<ProductEdit category={ProductCategoryEnum.ChildCare} />
				}
			/>
		</Routes>
	);
}
