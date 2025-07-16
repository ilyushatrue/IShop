import { Box, BoxProps, Button } from "@mui/material";
import lang from "lang";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Frequency, Options } from "rrule";

import RRuleInputByweekday from "./RRuleInputByweekday";
import RRuleInputFreq from "./RRuleInputFreq";
import RRuleInputInterval from "./RRuleInputInterval";
import RRuleInputBysetposCheckbox from "./RRuleInputBysetposCheckbox";
import RRuleInputByMonth from "./RRuleInputByMonth";
import RRuleInputBymonthday from "./RRuleInputBymonthday";
import RRuleInputByhour from "./RRuleInputByhour";
import RRuleInputDtstart from "./RRuleInputDtstart";

export interface IProps extends Omit<BoxProps, "onSubmit" | "onChange"> {
    onSubmit: (data: Partial<Options>) => void;
    onChange: (options: Partial<Options>) => void;
    onCancel?: () => void;
    options: Partial<Options>;
}

export default function RecurrenceRuleForm({ onSubmit, onCancel, onChange, options, ...props }: IProps) {
    const { handleSubmit, control, setValue, reset, watch, getValues } = useForm<
        Partial<Options> & { bysetposCheckbox?: boolean }
    >({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: options,
    });

    const [freq, byhour, bymonth, bymonthday, bysetpos, byweekday, dtstart, interval, bysetposCheckbox] = watch([
        "freq",
        "byhour",
        "bymonth",
        "bymonthday",
        "bysetpos",
        "byweekday",
        "dtstart",
        "interval",
        "bysetposCheckbox",
    ]);

    useEffect(() => {
        handleChangeValues();
    }, [byhour, bymonth, bymonthday, bysetpos, byweekday, dtstart, interval]);

    useEffect(() => {
        switch (freq) {
            case Frequency.YEARLY:
                break;
            case Frequency.MONTHLY:
                setValue("bymonth", []);
                break;
            case Frequency.WEEKLY:
                break;
            case Frequency.DAILY:
                setValue("bymonthday", []);
                break;
            case Frequency.HOURLY:
                setValue("byhour", []);
                break;
            case Frequency.MINUTELY:
                setValue("byminute", []);
                break;
            case Frequency.SECONDLY:
                break;
        }
        handleChangeValues();
    }, [freq]);

    useEffect(() => {
        setValue("bysetpos", bysetposCheckbox ? -1 : undefined);
        setValue("bymonthday", undefined);
        handleChangeValues();
    }, [bysetposCheckbox]);

    const submit: SubmitHandler<Partial<Options>> = (data) => {
        onSubmit(data);
    };

    const handleCancel = () => {
        reset();
        onCancel?.();
    };

    const handleChangeValues = () => {
        const values = getValues();
        delete values.bysetposCheckbox;
        onChange(values);
    };

    return (
        <Box
            {...props}
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
            component={"form"}
        >
            <RRuleInputFreq control={control} />
            <RRuleInputDtstart control={control} />
            <RRuleInputInterval control={control} />
            <RRuleInputByweekday control={control} />
            <RRuleInputByMonth control={control} />
            <RRuleInputBysetposCheckbox control={control} />
            <RRuleInputBymonthday control={control} />
            <RRuleInputByhour control={control} />
            <Box
                display={"flex"}
                gap={2}
                justifyContent={"end"}
            >
                <Button
                    onClick={handleCancel}
                    sx={{ textTransform: "none" }}
                >
                    {lang.cancel}
                </Button>
                <Button
                    onClick={handleSubmit(submit)}
                    variant="contained"
                    sx={{ textTransform: "none" }}
                >
                    {lang.save}
                </Button>
            </Box>
        </Box>
    );
}
