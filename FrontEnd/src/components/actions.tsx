import { Grid, SxProps } from "@mui/material";
import Button from "./button";
import { useMemo } from "react";
export interface IAction {
	disabled?: boolean;
	label: string;
	type?: "reset" | "submit" | "button";
	onClick?: () => void;
	position: "center" | "left" | "right";
	sx?: SxProps;
}
export default function Actions({
	sx,
	defaultActions = [],
	actions = (defaultActions) => defaultActions,
}: {
	sx?: SxProps;
	defaultActions?: IAction[];
	actions?: (defaultActions: IAction[]) => IAction[];
}) {
	const actionGroups = useMemo(
		() => actions(defaultActions).groupBy((action) => action.position),
		[actions, defaultActions]
	);

	return (
		<Grid container display={"flex"} sx={sx}>
			<Grid
				item
				flex={1}
				display={"flex"}
				justifyContent={"start"}
				gap={1}
			>
				{actionGroups["left"]?.map((action, index) => (
					<Button
						key={index}
						disabled={action.disabled}
						type={action.type}
						sx={{ flex: 1, ...action.sx }}
						onClick={action.onClick}
					>
						{action.label}
					</Button>
				))}
			</Grid>
			<Grid
				item
				flex={1}
				display={"flex"}
				justifyContent={"center"}
				gap={1}
			>
				{actionGroups["center"]?.map((action, index) => (
					<Button
						key={index}
						disabled={action.disabled}
						type={action.type}
						sx={{ flex: 1, ...action.sx }}
						onClick={action.onClick}
					>
						{action.label}
					</Button>
				))}
			</Grid>
			<Grid item flex={1} display={"flex"} justifyContent={"end"} gap={1}>
				{actionGroups["right"]?.map((action, index) => (
					<Button
						key={index}
						disabled={action.disabled}
						type={action.type}
						sx={{ flex: 1, ...action.sx }}
						onClick={action.onClick}
					>
						{action.label}
					</Button>
				))}
			</Grid>
		</Grid>
	);
}
