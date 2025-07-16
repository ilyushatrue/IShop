import {
	Control,
	Controller,
	ControllerRenderProps,
	useWatch,
} from "react-hook-form";
import { Frequency } from "rrule";

import RRuleInputSelectMany from "./RRuleInputSelectMany";

export default function RRuleInputByhour({
	control,
}: {
	control: Control<any>;
}) {
	const freq = useWatch({ control: control, name: "freq" });
	if (freq !== Frequency.HOURLY) return null;

	const options = Array.from({ length: 24 }, (_, i) => ({
		key: i,
		value: i.toString(),
	}));

	const handleChange =
		(field: ControllerRenderProps<any, "byhour">) => (values: number[]) => {
			field.onChange(values);
		};
	return (
		<Controller
			control={control}
			name={"byhour"}
			render={({ field, fieldState: { error } }) => (
				<RRuleInputSelectMany
					error={error}
					values={field.value ?? []}
					label="Часы"
					onChange={handleChange(field)}
					options={options}
				/>
			)}
		/>
	);
}
