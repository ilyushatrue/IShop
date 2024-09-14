import React, { useCallback, useEffect, useState } from "react";
import AccountPage from "../../account-page";
import ProductEditForm from "./product-edit-form";
import { IProduct } from "../../../../api/interfaces/product/product.interface";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../../../api/hooks/use-api.hook";
import ProductsApi from "../../../../api/endpoints/products.api";
import { ProductCategoryEnum } from "../../../../api/enums/product-category.enum";
import AccountPageSideBox from "../../account-page-side-box";
import AccountPageMainBox from "../../account-page-main-box";
import { Box } from "@mui/material";
import AccountPageMainBoxHeader from "../../account-page-main-box-header";

export default function ProductEdit() {
	const navigate = useNavigate();
	const { category, id } = useParams();
	const backUrl = `/my/products/${category}`;
	const navigateBack = useCallback(
		() => navigate(backUrl),
		[backUrl, navigate]
	);
	const { fetchAsync } = useApi();
	const categoryEnum =
		ProductCategoryEnum[
			category!.capitalize() as keyof typeof ProductCategoryEnum
		] + 1;
	console.log(categoryEnum);
	const defaultValues: IProduct = {
		categoryId: categoryEnum,
		description: "",
		id: "",
		imageId: "",
		name: "",
		price: 0,
	};
	const [product, setProduct] = useState(defaultValues);

	const handleSubmit = (values: IProduct) => {
		const cb = id ? ProductsApi.updateAsync : ProductsApi.createAsync;
		fetchAsync({
			request: cb(values),
			onSuccess: (success) => success.popup("Данные сохранены"),
			onError: (error) => error.log().popup(),
		})
			.then(navigateBack)
			.catch(navigateBack);
	};

	useEffect(() => {
		if (!id) return;
		fetchAsync({
			request: ProductsApi.getByIdAsync(id),
			onError: (error) => error.log().popup(),
		})
			.then((result) => {
				setProduct(result!.body!);
			})
			.catch(navigateBack);
	}, [fetchAsync, id, navigateBack]);

	return (
		<AccountPage>
			<AccountPageSideBox />
			<AccountPageMainBox>
				<AccountPageMainBoxHeader
					backUrl={backUrl}
					backText="К товарам"
				>
					{product.name}
				</AccountPageMainBoxHeader>
				<Box sx={{ marginX: "auto", maxWidth: 500, padding: 1 }}>
					<ProductEditForm
						defaultValues={product}
						loading={false}
						onSubmit={handleSubmit}
					/>
				</Box>
			</AccountPageMainBox>
		</AccountPage>
	);
}
