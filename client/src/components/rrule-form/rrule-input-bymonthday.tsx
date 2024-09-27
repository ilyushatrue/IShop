import { Control, Controller, ControllerRenderProps, useWatch } from "react-hook-form";
import { Frequency } from "rrule";

import RRuleInputSelectMany from "./RRuleInputSelectMany";

export default function RRuleInputBymonthday({ control }: { control: Control<any> }) {
    const [freq, bysetpos] = useWatch({ control: control, name: ["freq", "bysetpos"] });
    if (freq === Frequency.DAILY || freq === Frequency.WEEKLY || (freq === Frequency.MONTHLY && bysetpos === -1))
        return null;

    const options = Array.from({ length: 31 }, (_, i) => ({ key: i, value: i.toString() }));
    const handleChange = (field: ControllerRenderProps<any, "bymonthday">) => (values: number[]) => {
        field.onChange(values);
    };

    return (
        <Controller
            control={control}
            name={"bymonthday"}
            render={({ field, fieldState: { error } }) => (
                <RRuleInputSelectMany
                    values={field.value ?? []}
                    onChange={handleChange(field)}
                    label="Числа месяца"
                    options={options}
                    error={error}
                />
            )}
        />
    );
}
