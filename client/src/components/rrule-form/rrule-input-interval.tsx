import { Control, Controller, ControllerRenderProps } from "react-hook-form";

import Counter from "../../Counter";

export default function RRuleInputInterval({ control }: { control: Control<any> }) {
    const handleChange = (field: ControllerRenderProps<any, "interval">) => (value: number) => {
        field.onChange(value);
    };

    return (
        <Controller
            name="interval"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Counter
                    label="Интервал"
                    value={field.value!}
                    onChangeValue={handleChange(field)}
                    error={!!error}
                    helperText={error?.message ? error.message : ""}
                />
            )}
        />
    );
}
