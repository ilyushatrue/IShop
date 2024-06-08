import {
	CSSProperties,
	ReactElement,
	Ref,
	cloneElement,
	forwardRef,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import {
	DefaultValues,
	FieldValues,
	Path,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import InputEmail from "./input/input-email";
import InputPassword from "./input/input-password";
import InputText from "./input/input-text";
import InputPhone from "./input/input-phone";
import { IFormField } from "./input/form-field.interface";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import InputPasswordConfirm from "./input/input-password-confirm";

const formStyles: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "end",
	alignItems: "center",
};

export type TFormBuilderRef<T extends FieldValues> = {
	email: (props: IFormField<T>) => TFormBuilderRef<T> | null;
	text: (props: IFormField<T>) => TFormBuilderRef<T> | null;
	password: (props: IFormField<T>) => TFormBuilderRef<T> | null;
	passwordConfirm: (
		props: IFormField<T> & { password: Path<T> }
	) => TFormBuilderRef<T> | null;
	phone: (props: IFormField<T>) => TFormBuilderRef<T> | null;
};

export interface IForm<T extends FieldValues> {
	defaultValues: DefaultValues<T>;
	onSubmitAsync: (values: T) => Promise<void>;
	submitButtonText: string;
	minHeight: number | string;
}

function FormBuilder<T extends FieldValues>(
	{ defaultValues, onSubmitAsync, submitButtonText, minHeight }: IForm<T>,
	ref: Ref<TFormBuilderRef<T>>
) {
	const [isLoading, setIsLoading] = useState(false);
	const { handleSubmit, control, watch } = useForm<T>({
		mode: "onChange",
		reValidateMode: "onBlur",
		defaultValues,
	});
	const [inputsMap, setInputsMap] = useState<Map<string, ReactElement>>(
		new Map()
	);
	const inputs = useMemo(() => Array.from(inputsMap.values()), [inputsMap]);

	const handleSubmitButtonClick: SubmitHandler<T> = async (
		data
	): Promise<void> => {
		setIsLoading(true);
		await onSubmitAsync(data);
		setIsLoading(false);
	};

	const addInput = (key: string, field: ReactElement) => {
		setInputsMap((map) => {
			if (!map.has(key)) {
				const newMap = new Map(map);
				newMap.set(key, field);
				return newMap;
			}
			return map;
		});
	};

	const inputBuilder: TFormBuilderRef<T> = useMemo<TFormBuilderRef<T>>(
		() => ({
			email: (props: IFormField<T>) => {
				addInput(
					props.name,
					<InputEmail<T>
						{...props}
						control={control}
						key={props.name}
					/>
				);
				return inputBuilder;
			},
			password: (props: IFormField<T>) => {
				addInput(
					props.name,
					<InputPassword<T>
						{...props}
						control={control}
						key={props.name}
					/>
				);
				return inputBuilder;
			},
			passwordConfirm: (props: IFormField<T> & { password: Path<T> }) => {
				addInput(
					props.name,
					<InputPasswordConfirm<T>
						{...props}
						control={control}
						key={props.name}
						onChange={() => watch(props.password)}
					/>
				);
				return inputBuilder;
			},
			text: (props: IFormField<T>) => {
				addInput(
					props.name,
					<InputText<T>
						{...props}
						control={control}
						key={props.name}
					/>
				);
				return inputBuilder;
			},
			phone: (props: IFormField<T>) => {
				addInput(
					props.name,
					<InputPhone<T>
						{...props}
						control={control}
						key={props.name}
					/>
				);
				return inputBuilder;
			},
		}),
		[control, watch]
	);

	useImperativeHandle(ref, () => inputBuilder, [inputBuilder]);

	return (
		<form
			onSubmit={handleSubmit(handleSubmitButtonClick)}
			style={{ ...formStyles, minHeight: minHeight }}
		>
			{inputs.map((input) =>
				cloneElement(input, { disabled: isLoading })
			)}
			<Button
				type="submit"
				disabled={isLoading}
				variant="contained"
				sx={{ width: "50%", margin: "16px" }}
			>
				{isLoading ? <CircularProgress size={24} /> : submitButtonText}
			</Button>
		</form>
	);
}

export default forwardRef(FormBuilder) as <T extends FieldValues>(
	props: IForm<T> & { ref?: Ref<TFormBuilderRef<T>> }
) => ReactElement;
