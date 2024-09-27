import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import { Frequency } from "rrule";

import RRuleInputSelectOne from "./RRuleInputSelectOne";

export default function RRuleInputFreq({ control }: { control: Control<any> }) {
    const repeat: Record<Frequency, string> = {
        [Frequency.YEARLY]: "Каждый год",
        [Frequency.MONTHLY]: "Каждый месяц",
        [Frequency.WEEKLY]: "Каждую неделю",
        [Frequency.DAILY]: "Каждый день",
        [Frequency.HOURLY]: "Каждый час",
        [Frequency.MINUTELY]: "Каждую минуту",
        [Frequency.SECONDLY]: "Каждую секунду",
    };

    const handleChange = (field: ControllerRenderProps<any, "freq">) => (value: number) => {
        field.onChange(value);
    };

    return (
        <Controller
            control={control}
            name={"freq"}
            render={({ field, fieldState: { error } }) => {
                return (
                    <RRuleInputSelectOne
                        error={error}
                        value={field.value}
                        onChange={handleChange(field)}
                        label="Повторять"
                        options={[
                            { key: Frequency.YEARLY, value: repeat[Frequency.YEARLY] },
                            { key: Frequency.MONTHLY, value: repeat[Frequency.MONTHLY] },
                            { key: Frequency.WEEKLY, value: repeat[Frequency.WEEKLY] },
                            { key: Frequency.DAILY, value: repeat[Frequency.DAILY] },
                        ]}
                    />
                );
            }}
        />
    );
}
