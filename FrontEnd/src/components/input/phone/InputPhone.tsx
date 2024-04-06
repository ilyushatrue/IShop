import React, { ReactNode } from "react";
import MaskedInput, { MaskedInputProps } from "react-text-mask";
import TextField from "@mui/material/TextField";

interface CustomMaskedInputProps extends MaskedInputProps {
	inputRef: React.Ref<HTMLInputElement>;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomMaskedInputProps>(
	(props, ref) => {
		const { mask, ...other } = props;
		return <MaskedInput mask={mask} {...other} />;
	}
);

interface IProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	sm?: boolean;
	helperText: ReactNode;
}
export default function PhoneInput({ onChange, sm, helperText }: IProps) {
	return (
		<TextField
			onChange={onChange}
			label="Номер телефона"
			fullWidth
			sx={{
				input: {
					bgcolor: "white",
				},
			}}
			variant="filled"
			size={sm ? "medium" : "small"}
			helperText={helperText}
			InputProps={{
				inputComponent: TextMaskCustom as any,
				inputProps: {
					mask: ["+","7"," ","(",/\d/,/\d/,/\d/,")"," ",/\d/,/\d/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/,],
				},
			}}
		/>
	);
}
