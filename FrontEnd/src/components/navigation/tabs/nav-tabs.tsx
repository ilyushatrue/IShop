import * as React from "react";
import Tabs from "@mui/material/Tabs";
import LinkTab, { ILinkTab } from "./link-tab";

interface IProps {
	menuItems: { label: string; href: string }[];
	orientation: "vertical" | "horizontal";
	onChange: (tabIndex: number) => void;
	value: number | null;
}

export default function NavTabs({
	menuItems,
	orientation,
	onChange,
	value,
}: IProps) {
	const tabs = React.useMemo(() => {
		const items: ILinkTab[] = menuItems.map((tab, index) => ({
			href: tab.href,
			label: tab.label,
			index: index,
			onClick: (activeIndex: number) => {
				onChange(activeIndex);
			},
		}));
		return items;
	}, [menuItems, onChange]);

	return (
		<Tabs
			value={value ?? false}
			orientation={orientation}
			TabIndicatorProps={{
				style:
					orientation === "vertical"
						? { left: "0px", width: "4px" }
						: {},
			}}
		>
			{tabs.map((tab) => (
				<LinkTab
					key={tab.index}
					isActive={value ? false : value === tab.index}
					index={tab.index}
					label={tab.label}
					href={tab.href}
					onClick={tab.onClick}
				/>
			))}
		</Tabs>
	);
}
