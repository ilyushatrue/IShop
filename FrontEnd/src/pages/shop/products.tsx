import { Box, Grid } from "@mui/material";
import { IProduct } from "../../api/interfaces/product/product.interface";
import Card from "../../components/card/card";
import getConstant from "../../infrastructure/constantProvider";

interface IProps {
	products: IProduct[];
}
export default function Products({ products }: IProps) {
	const imagesPath = getConstant("API_URL");
	products.forEach(p=> console.log(imagesPath + "/" + p.imageId))
	return (
		<Box display={"flex"} justifyContent={"center"}>
			<Grid container spacing={3} width={"100%"} height={"100%"}>
				{products.map((p, index) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
						<Card src={imagesPath + "/media/image/" + p.imageId}>{p.name}</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
