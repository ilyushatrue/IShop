import { Box, Button, Icon, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";

import { IRecursiveTreeBranch } from "./recursive-tree-branch";

export interface IRecursiveTreeAction {
	icon: string;
	helperText: string;
	invoke: (id: number | string) => void;
}

export interface IRecursiveTreeActions<T> {
	branch: IRecursiveTreeBranch<T>;
	actions: {
		include: (defaultActions: IRecursiveTreeAction[]) => {
			actions: IRecursiveTreeAction[];
			fields: ((item: T) => { value: string; label: string })[];
		};
		width: number;
		iconSize?: "large" | "medium" | "small";
	};
}
export default function RecursiveTreeActions<T>({
	actions,
	branch,
}: IRecursiveTreeActions<T>) {
	const [isEditOn, setIsEditOn] = useState(false);
	const defaultActions: IRecursiveTreeAction[] = [
		{ icon: "edit", helperText: "Редактировать", invoke: handleEdit },
		{ icon: "subject", helperText: "Подробнее", invoke: handleView },
	];
	const userActions = useMemo(
		() => actions.include(defaultActions),
		[actions]
	);

	function handleEdit(id: number | string) {
		setIsEditOn(true);
	}
	function handleView(id: number | string) {}

	return (
		<Box display={"flex"} justifyContent={"end"} width={actions.width}>
			<>
				{userActions.actions.map((action, index) => (
					<Tooltip key={index} title={action.helperText}>
						<Box overflow={"hidden"}>
							<Button
								size={actions.iconSize}
								name={action.icon}
								onClick={(e) => {
									e.stopPropagation();
									action.invoke(branch.id);
								}}
								sx={{ color: "primary.main" }}
							>
								<Icon>{"menu"}</Icon>
							</Button>
						</Box>
					</Tooltip>
				))}

				{userActions.fields.map((field, index) => (
					<Box key={index}>
						<Box>
							{field(branch.item).label +
								": " +
								field(branch.item).value}
						</Box>
					</Box>
				))}
			</>
		</Box>
	);
}
