import { Box, BoxProps, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { Frequency, Options, RRule } from "rrule";

import RecurrenceRuleForm from "./RRuleForm";

export interface IProps extends Omit<BoxProps, "onSubmit"> {
    onSubmit: (rrule: RRule) => void;
    onCancel?: () => void;
    rrule?: RRule;
}

export default function RecurrenceRuleFormContainer({ onSubmit, onCancel, rrule, sx, ...props }: IProps) {
    const date = useMemo(() => {
        const date = new Date();
        date.setHours(10, 0, 0, 0);
        return date;
    }, []);
    const defaultOptions: Partial<Options> = {
        freq: Frequency.DAILY,
        dtstart: date,
        interval: 1,
    };
    const weekDays: Record<number, string> = {
        0: "воскресенье",
        1: "понедельник",
        2: "вторник",
        3: "среда",
        4: "четверг",
        5: "пятница",
        6: "суббота",
    };

    const [_rrule, _setRRule] = useState(rrule ?? new RRule(defaultOptions));

    const handleSubmit = () => {
        onSubmit(_rrule);
    };

    const handleChange = (options: Partial<Options>) => {
        const rrule = new RRule(options);
        _setRRule(rrule);
    };

    return (
        <Box
            {...props}
            sx={{ ...sx, display: "flex", flexDirection: "column", gap: 1 }}
        >
            <Box sx={{ mb: 1 }}>
                {_rrule.toString()}
                {_rrule
                    .all((d, len) => len < 6)
                    .slice(1)
                    .map((date, i) => (
                        <Box
                            key={date.toISOString()}
                            sx={{ display: "flex", justifyContent: "space-between", width: 600 }}
                        >
                            <Typography
                                fontSize={13}
                                color={"rgb(90,90,90)"}
                            >
                                {i === 0 ? "Следующий" : "Далее"}
                            </Typography>
                            <Typography
                                fontSize={13}
                                color={"rgb(90,90,90)"}
                            >
                                {weekDays[date.getUTCDay()]} {date.getUTCDate()}.{date.getUTCMonth()}.
                                {date.getUTCFullYear()} {date.getUTCHours()}:{date.getMinutes()}:{date.getSeconds()} UTC
                            </Typography>
                            <Typography
                                fontSize={13}
                                color={"rgb(90,90,90)"}
                            >
                                {weekDays[date.getDay()]} {date.getDate()}.{date.getMonth()}.{date.getFullYear()}{" "}
                                {date.getHours()}:{date.getMinutes()}:{date.getSeconds()} ВДК
                            </Typography>
                        </Box>
                    ))}
            </Box>
            <RecurrenceRuleForm
                options={_rrule.origOptions}
                onChange={handleChange}
                onCancel={onCancel}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}
