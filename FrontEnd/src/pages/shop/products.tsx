import { Box, Grid } from "@mui/material";
import React from "react";
import { IProduct } from "../../api/interfaces/product/product.interface";
import jpg from "../../../public/images/banano.jpeg";
import Card from "../../components/card/card";
import getConstant from "../../infrastructure/constantProvider";

interface IProps {
	products: IProduct[];
}
export default function Products({ products }: IProps) {
	const imagesPath = getConstant("IMAGES_PATH") + "shop/";
	return (
		<Box display={"flex"} justifyContent={"center"} bgcolor={"orange"} >
			<Grid
				container
				xs={1}
				sm={2}
				md={3}
				lg={4}
				xl={6}
				spacing={3}
				width={"100%"}
				height={"100%"}
			>
				{products.map((p, index) => (
					<Grid item>
						<Card key={index} src={imagesPath + p.imageUrl}>
							{p.name}
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
