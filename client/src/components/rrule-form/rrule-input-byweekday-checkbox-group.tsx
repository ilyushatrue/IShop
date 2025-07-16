import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText } from "@mui/material";
import { Weekday } from "rrule";

export default function RRuleInputByweekdayCheckboxGroup({
    options,
    values,
    error,
    onChange,
}: {
    values?: Weekday[];
    options: Weekday[];
    error: any;
    onChange: (weekday: Weekday, checked: boolean) => void;
}) {
    const labels: Record<string, string> = {
        MO: "Пн",
        TU: "Вт",
        WE: "Ср",
        TH: "Чт",
        FR: "Пт",
        SA: "Сб",
        SU: "Вс",
    };

    const handleChange = (weekday: Weekday) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        onChange(weekday, checked);
    };

    return (
        <FormControl
            component="fieldset"
            variant="standard"
        >
            <FormLabel
                component="legend"
                sx={{ fontSize: 12 }}
            >
                Дни недели
            </FormLabel>
            <FormGroup row={true}>
                {options.map((weekday) => (
                    <FormControlLabel
                        key={weekday.toString()}
                        control={
                            <Checkbox
                                size="small"
                                checked={values?.includes(weekday) ?? false}
                                onChange={handleChange(weekday)}
                                name={weekday.toString()}
                            />
                        }
                        label={labels[weekday as any]}
                    />
                ))}
            </FormGroup>
            {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
    );
}
