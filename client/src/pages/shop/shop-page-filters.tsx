import styled from "@emotion/styled";
import { Slider, SliderThumb, Typography } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

const AirbnbSlider = styled(Slider)(({ theme }) => ({
	color: "black",
	height: 3,
	padding: "13px 0",
	"& .MuiSlider-thumb": {
		height: 27,
		width: 27,
		backgroundColor: "#fff",
		border: "1px solid black",
		"&:hover": {
			boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
		},
		"& .airbnb-bar": {
			height: 9,
			width: 1,
			backgroundColor: "black",
			marginLeft: 1,
			marginRight: 1,
		},
	},
	"& .MuiSlider-track": {
		height: 3,
	},
	"& .MuiSlider-rail": {
		color: "#d8d8d8",
		opacity: 1,
		height: 3,
	},
}));

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
	const { children, ...other } = props;
	return (
		<SliderThumb {...other}>
			{children}
			<span className="airbnb-bar" />
			<span className="airbnb-bar" />
			<span className="airbnb-bar" />
		</SliderThumb>
	);
}

export default function ShopPageFilters({
	onChange,
	min,
	max,
}: {
	min: number;
	max: number;
	onChange: ({ min, max }: { min: number; max: number }) => void;
}) {
	const [fromPrice, setFromPrice] = useState(min);
	const [toPrice, setToPrice] = useState(max);
	const defaultFromPrice = 3000;
	const defaultToPrice = 100_000;
	const maxPrice = 500_000;
	const minPrice = 0;

	const handleMouseUp = (
		event: Event | SyntheticEvent<Element, Event>,
		newValue: number | number[]
	) => {
		const [from, to] = newValue as number[];
		onChange({ min: from, max: to });
	};

	const handleChange = (
		event: Event | SyntheticEvent<Element, Event>,
		newValue: number | number[]
	) => {
		const [from, to] = newValue as number[];
		setFromPrice(from);
		setToPrice(to);
	};

	return (
		<>
			<Typography>
				Цена от {fromPrice} до {toPrice}
			</Typography>
			<AirbnbSlider
				slots={{ thumb: AirbnbThumbComponent }}
				getAriaLabel={(index) =>
					index === 0 ? "Minimum price" : "Maximum price"
				}
				onChange={handleChange}
				onChangeCommitted={handleMouseUp} // Используем onChangeCommitted вместо onChange
				defaultValue={[defaultFromPrice, defaultToPrice]}
				max={maxPrice}
				min={minPrice}
			/>
		</>
	);
}
