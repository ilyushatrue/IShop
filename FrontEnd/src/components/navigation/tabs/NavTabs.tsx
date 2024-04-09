import * as React from "react";
import Tabs from "@mui/material/Tabs";
import LinkTab, { ILinkTab } from "./LinkTab";

interface IProps {
	menuItems: { label: string; href: string }[];
	orientation: "vertical" | "horizontal";
	onChange: (tabIndex: number) => void;
}

export default function NavTabs({ menuItems, orientation, onChange }: IProps) {
	const [value, setValue] = React.useState(0);

	const tabs = React.useMemo(() => {
		const items: ILinkTab[] = menuItems.map((tab, index) => ({
			href: tab.href,
			label: tab.label,
			index: index,
			onClick: (activeIndex: number) => {
				setValue(activeIndex);
				onChange(activeIndex);
			},
		}));
		return items;
	}, [menuItems, onChange]);

	return (
		<Tabs
			value={value}
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
					isActive={value === tab.index}
					index={tab.index}
					label={tab.label}
					href={tab.href}
					onClick={tab.onClick}
				/>
			))}
		</Tabs>
	);
}
