import { Checkbox, FormControlLabel } from "@mui/material";
import { ChangeEvent } from "react";
import { Control, Controller, ControllerRenderProps, useWatch } from "react-hook-form";
import { Frequency } from "rrule";

export default function RRuleInputBysetposCheckbox({ control }: { control: Control<any> }) {
    const freq = useWatch({ control: control, name: "freq" });
    if (freq !== Frequency.MONTHLY) return null;

    const handleChange =
        (field: ControllerRenderProps<any, "bysetposCheckbox">) => (e: ChangeEvent<HTMLInputElement>) => {
            const checked = e.target.checked;
            field.onChange(checked);
        };

    return (
        <Controller
            name="bysetposCheckbox"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            value={field.value ?? []}
                            onChange={handleChange(field)}
                        />
                    }
                    label="В последний день месяца"
                />
            )}
        />
    );
}
