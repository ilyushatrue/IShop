import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import DateTime from "components/Inputs/DateTime";

export default function RRuleInputDtstart({ control }: { control: Control<any> }) {
    const handleChange = (field: ControllerRenderProps<any, "dtstart">) => (date: Date | null) => {
        const newDate = !!date ? new Date(date) : new Date();
        field.onChange(newDate);
    };

    return (
        <Controller
            name="dtstart"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <DateTime
                    label={"Дата"}
                    variant="standard"
                    fullWidth
                    autoFocus
                    value={field.value!}
                    onChangeValue={handleChange(field)}
                    error={!!error}
                    helperText={error?.message}
                />
            )}
        />
    );
}
