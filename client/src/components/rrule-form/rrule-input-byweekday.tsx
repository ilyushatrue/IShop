import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import { RRule, Weekday } from "rrule";

import RRuleInputByweekdayCheckboxGroup from "./RRuleInputByweekdayCheckboxGroup";

export default function RRuleInputByweekday({ control }: { control: Control<any> }) {
    const allWeekdays = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU];

    const handleChange = (field: ControllerRenderProps<any, "byweekday">) => (value: Weekday, checked: boolean) => {
        let newValues = !!field.value?.length ? [...field.value] : [];
        if (checked) {
            newValues = newValues.concat(value);
        } else {
            newValues = newValues.filter((x) => x !== value);
        }
        const sorted = allWeekdays.filter((x) => newValues.includes(x));
        field.onChange(sorted);
    };

    return (
        <Controller
            name="byweekday"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <RRuleInputByweekdayCheckboxGroup
                    error={error}
                    values={field.value}
                    onChange={handleChange(field)}
                    options={allWeekdays}
                />
            )}
        />
    );
}
