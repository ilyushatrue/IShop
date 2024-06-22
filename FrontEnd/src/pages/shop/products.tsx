import { Box, BoxProps, Grid, Typography } from "@mui/material";
import { IProduct } from "../../api/interfaces/product/product.interface";
import Card from "../../components/card/card";
import getConstant from "../../infrastructure/constantProvider";
import { useMemo } from "react";
import { IIconButton } from "../../components/icon-button";
import useApi from "../../api/hooks/use-api.hook";
import { useAppSelector } from "../../app/hooks/redux/use-app-selector";

interface IProps extends BoxProps {
	products: IProduct[];
}
export default function Products({ products, ...props }: IProps) {
	const imagesPath = getConstant("API_URL");
	const isAuth = useAppSelector((state) => state.user.isAuthenticated);
	const { fetchAsync, isFetching } = useApi();
	const cardActions: IIconButton[] = useMemo(() => {
		let actions: IIconButton[] = [
			{
				iconName: "favorite_outline",
				fontSize: 28,
				centered: true,
				onClick: console.log,
				orientation: "vertical",
				variant: "circled",
			},
		];
		if (isAuth) {
			actions = actions.concat([
				{
					iconName: "edit",
					fontSize: 28,
					centered: true,
					onClick: console.log,
					orientation: "vertical",
					variant: "circled",
				},
				{
					iconName: "delete_outline",
					fontSize: 28,
					onClick: console.log,
					centered: true,
					variant: "circled",
					orientation: "vertical",
				},
			]);
		}
		return actions;
	}, [isAuth]);

	return (
		<Box {...props} display={"flex"} justifyContent={"center"}>
			<Grid container rowSpacing={4} width={"100%"} height={"100%"}>
				{products.map((p, index) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
						<Card
							src={imagesPath + "/media/image/" + p.imageId}
							actions={cardActions}
							height={300}
						>
							<Typography variant="body2">{p.name}</Typography>
							<Typography variant="caption">
								{p.description}
							</Typography>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
