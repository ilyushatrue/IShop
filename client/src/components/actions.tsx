import { ElementType, useMemo } from "react";
import { Box, ButtonProps, Grid, SxProps, Tooltip } from "@mui/material";
import Button from "./buttons/button";

export interface IAction {
	value: string;
	position?: "center" | "left" | "right";
	tooltip?: string;
	display?: "none" | "inherit";
	componentProps?: ButtonProps;
	component?: ElementType<ButtonProps>;
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
		() =>
			actions(defaultActions).groupBy(
				(action) => action.position ?? "right"
			),
		[actions, defaultActions]
	);
	return (
		<Grid container display={"flex"} sx={sx} spacing={1}>
			<Grid
				item
				flex={1}
				display={"flex"}
				justifyContent={"start"}
				gap={1}
			>
				{actionGroups["left"]?.map((action, index) => {
					const Component = action.component || Button;
					return (
						<Tooltip
							title={action.tooltip}
							key={index}
							sx={{ display: action.display }}
						>
							<Box
								sx={{
									flex: 1,
									display: "flex",
									justifyContent: "start",
								}}
							>
								<Component {...action.componentProps}>
									{action.value}
								</Component>
							</Box>
						</Tooltip>
					);
				})}
			</Grid>
			<Grid
				item
				flex={1}
				display={"flex"}
				justifyContent={"center"}
				gap={1}
			>
				{actionGroups["center"]?.map((action, index) => {
					const Component = action.component || Button;
					return (
						<Tooltip
							title={action.tooltip}
							key={index}
							sx={{ display: action.display }}
						>
							<Box
								sx={{
									flex: 1,
									display: "flex",
									justifyContent: "center",
								}}
							>
								<Component {...action.componentProps}>
									{action.value}
								</Component>
							</Box>
						</Tooltip>
					);
				})}
			</Grid>
			<Grid item flex={1} display={"flex"} justifyContent={"end"} gap={1}>
				{actionGroups["right"]?.map((action, index) => {
					const Component = action.component || Button;
					return (
						<Tooltip
							title={action.tooltip}
							key={index}
							sx={{ display: action.display }}
						>
							<Box
								sx={{
									flex: 1,
									display: "flex",
									justifyContent: "end",
								}}
							>
								<Component {...action.componentProps}>
									{action.value}
								</Component>
							</Box>
						</Tooltip>
					);
				})}
			</Grid>
		</Grid>
	);
}
