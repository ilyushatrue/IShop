import Tabs from "@mui/material/Tabs";
import LinkTab, { ILinkTab } from "./link-tab";
import { useMemo } from "react";

interface IProps {
	menuItems: { label: string; href: string; iconName: string }[];
	orientation: "vertical" | "horizontal";
	onChange?: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		tabIndex: number,
		href: string
	) => void;
	value: number | null;
}

export default function NavTabs({
	menuItems,
	orientation,
	value,
	onChange,
}: IProps) {
	const tabs = useMemo(() => {
		const items: ILinkTab[] = menuItems.map((tab, index) => ({
			href: tab.href,
			label: tab.label,
			index: index,
			iconName: tab.iconName,
			onClick: onChange,
		}));
		return items;
	}, [menuItems, onChange]);

	return (
		<Tabs
			centered
			sx={{ width: "100%" }}
			value={value ?? false}
			orientation={orientation}
			TabIndicatorProps={{
				style: {
					...(orientation === "vertical"
						? { left: "0px", width: "4px" }
						: {}),
					color: "black",
					backgroundColor: "black",
				},
			}}
		>
			{tabs.map((tab) => (
				<LinkTab
					key={tab.index}
					iconName={tab.iconName}
					isActive={value === tab.index ? true : false}
					index={tab.index}
					label={tab.label}
					href={tab.href}
					onClick={tab.onClick}
				/>
			))}
		</Tabs>
	);
}
