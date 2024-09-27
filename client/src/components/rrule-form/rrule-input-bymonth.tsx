import {
	Control,
	Controller,
	ControllerRenderProps,
	useWatch,
} from "react-hook-form";
import { Frequency } from "rrule";

import RRuleInputSelectMany from "./RRuleInputSelectMany";

export default function RRuleInputByMonth({
	control,
}: {
	control: Control<any>;
}) {
	const freq = useWatch({ control: control, name: "freq" });
	if (freq === Frequency.MONTHLY) return null;

	const months: Record<number, string> = {
		1: "январь",
		2: "февраль",
		3: "март",
		4: "апрель",
		5: "май",
		6: "июнь",
		7: "июль",
		8: "август",
		9: "сентябрь",
		10: "октябрь",
		11: "ноябрь",
		12: "декабрь",
	};
	const options = Array.from({ length: 12 }, (_, i) => ({
		key: i + 1,
		value: months[i + 1],
	}));

	const handleChange =
		(field: ControllerRenderProps<any, "bymonth">) =>
		(values: number[]) => {
			field.onChange(values);
		};

	return (
		<Controller
			control={control}
			name={"bymonth"}
			render={({ field, fieldState: { error } }) => (
				<RRuleInputSelectMany
					error={error}
					values={field.value ?? []}
					onChange={handleChange(field)}
					label="Месяцы"
					options={options}
				/>
			)}
		/>
	);
}
