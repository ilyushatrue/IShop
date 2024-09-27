import {
    Box,
    Chip,
    FilledInput,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    FormHelperText,
    FormControlOwnProps,
    FormControlLabel,
    Checkbox,
    SelectChangeEvent,
} from "@mui/material";
import { ReactNode, useMemo, SyntheticEvent } from "react";

interface IFormSelectField {
    error: any;
    options: { key: number | string; value: string }[];
    endAdornment?: ReactNode;
    values?: number[];
    variant?: FormControlOwnProps["variant"];
    label?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    onChange?: (values: number[]) => void;
}
export default function RRuleInputSelectMany({
    onChange,
    options,
    label,
    variant = "outlined",
    endAdornment,
    required = false,
    values,
    disabled,
    readonly,
    error,
}: IFormSelectField) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const selectAllChecked = useMemo(() => values?.length === options.length, [options.length, values]);

    const MenuProps = useMemo(
        () => ({
            PaperProps: {
                sx: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                    paddingX: "12px",
                },
            },
        }),
        []
    );

    const inputVariantMapping: Record<string, JSX.Element> = {
        filled: <FilledInput />,
        outlined: <OutlinedInput label={label} />,
        standard: <Input />,
    };

    const toggleCheckbox = (e: SyntheticEvent) => {
        e.stopPropagation();
        const newCheckedState = !selectAllChecked;
        const newValues = newCheckedState ? (options.map((option) => option.key) as number[]) : [];
        onChange?.(newValues);
    };

    const handleChange = (e: SelectChangeEvent<number[]>) => {
        e.stopPropagation();
        const selectedValues = (e.target.value as number[]).sort((a, b) => a - b);
        onChange?.(selectedValues);
    };

    return (
        <FormControl
            fullWidth
            disabled={disabled}
            error={!!error}
            size="small"
            required={required}
        >
            <InputLabel>{label}</InputLabel>
            <Select
                multiple
                value={values}
                onChange={handleChange}
                input={inputVariantMapping[variant]}
                readOnly={readonly}
                endAdornment={endAdornment}
                renderValue={(selected) => {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                            }}
                        >
                            {(selected as number[])
                                .sort((a, b) => a - b)
                                .map((value, index) => (
                                    <Chip
                                        key={index}
                                        label={options.find((option) => option.key === value)?.value}
                                    />
                                ))}
                        </Box>
                    );
                }}
                MenuProps={MenuProps}
            >
                <FormControlLabel
                    sx={{ width: "100%" }}
                    onChange={toggleCheckbox}
                    control={<Checkbox checked={selectAllChecked} />}
                    label="Выбрать все"
                />
                {options.map((option) => (
                    <MenuItem
                        sx={{
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            paddingX: "12px",
                            marginRight: "4px",
                            marginBottom: "4px",
                            minHeight: "0px",
                            borderRadius: "20px",
                            bgcolor: "rgb(230,230,230)",
                            fontSize: "13px",
                            "&.Mui-selected": {
                                bgcolor: "primary.main",
                                color: "white",
                            },
                        }}
                        key={option.key}
                        value={option.key}
                    >
                        {option.value}
                    </MenuItem>
                ))}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
    );
}
