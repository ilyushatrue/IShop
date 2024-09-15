import React, { useCallback, useEffect, useState } from "react";
import AccountPage from "../../account-page";
import ProductEditForm from "./product-edit-form";
import { IProduct } from "../../../../api/interfaces/product/product.interface";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../../../api/hooks/use-api.hook";
import ProductsApi from "../../../../api/endpoints/products.api";
import {
	ProductCategoryEnum,
	productCategoryEnumLink,
} from "../../../../api/enums/product-category.enum";
import AccountPageSideBox from "../../account-page-side-box";
import AccountPageMainBox from "../../account-page-main-box";
import { Box } from "@mui/material";
import AccountPageMainBoxHeader from "../../account-page-main-box-header";

export default function ProductEdit({
	category,
}: {
	category: ProductCategoryEnum;
}) {
	const navigate = useNavigate();
	const { id: productId } = useParams();
	const backUrl = `/my/products/${productCategoryEnumLink[category]}`;
	const navigateBack = useCallback(
		() => navigate(backUrl),
		[backUrl, navigate]
	);
	const { fetchAsync } = useApi();

	const defaultValues: IProduct = {
		categoryId: category,
		description: "",
		id: "",
		imageId: "",
		name: "",
		price: 0,
	};
	const [product, setProduct] = useState(defaultValues);

	const handleSubmit = (values: IProduct) => {
		const cb = productId
			? ProductsApi.updateAsync
			: ProductsApi.createAsync;
		fetchAsync({
			request: cb(values),
			onSuccess: (success) => success.popup("Данные сохранены"),
			onError: (error) => error.log().popup(),
		})
			.then(navigateBack)
			.catch(navigateBack);
	};

	useEffect(() => {
		if (!productId) return;
		fetchAsync({
			request: ProductsApi.getByIdAsync(productId),
			onError: (error) => error.log().popup(),
		})
			.then((result) => {
				setProduct(result!.body!);
			})
			.catch(navigateBack);
	}, [fetchAsync, productId, navigateBack]);

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
