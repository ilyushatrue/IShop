import { Box, Grid } from "@mui/material";
import { IProduct } from "../../api/interfaces/product/product.interface";
import Card from "../../components/card/card";
import getConstant from "../../infrastructure/constantProvider";

interface IProps {
	products: IProduct[];
}
export default function Products({ products }: IProps) {
	const imagesPath = getConstant("IMAGES_PATH") + "shop/";
	return (
		<Box display={"flex"} justifyContent={"center"} bgcolor={"orange"}>
			<Grid container spacing={3} width={"100%"} height={"100%"}>
				{products.map((p, index) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
						<Card  src={imagesPath + p.imageUrl}>
							{p.name}
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
