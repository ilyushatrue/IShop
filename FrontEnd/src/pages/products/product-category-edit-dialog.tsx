import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import Dialog from "../../components/dialog";
import { IProductCategory } from "../../api/interfaces/product/categories/product-category.interface";
import Icon from "../../components/icon";
import IconButton from "../../components/icon-button";

export default function ProductCategoryEditDialog({
	open,
	onCancel,
	values,
}: {
	open: boolean;
	onCancel: () => void;
	values: IProductCategory[];
}) {
	return (
		<Dialog open={open} onCancel={onCancel}>
			<List
				sx={{
					width: "100%",
					maxWidth: 360,
					bgcolor: "background.paper",
				}}
			>
				{values.map((value, index) => {
					return (
						<ListItem
							key={index}
							secondaryAction={
								<IconButton
									iconName={"edit"}
									onClick={console.log}
								/>
							}
							disablePadding
						>
							<ListItemButton role={undefined} dense>
								<ListItemIcon>
									<Icon name={value.iconName} />
								</ListItemIcon>
								<ListItemText primary={value.name} />
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Dialog>
	);
}
