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
import InputEmail from "./inputs/input-email";
import InputPassword from "./inputs/input-password";
import InputText from "./inputs/input-text";
import InputPhone from "./inputs/input-phone";
import { IFormField } from "./inputs/form-field.interface";
import { CircularProgress } from "@mui/material";
import InputPasswordConfirm from "./inputs/input-password-confirm";
import InputImage from "./inputs/input-image";
import InputNumber from "./inputs/input-number";
import Button from "../button";

const formStyles: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "end",
	alignItems: "center",
};

export type TFormBuilderRef<T extends FieldValues> = {
	email: (props: IFormField<T>) => TFormBuilderRef<T>;
	text: (props: IFormField<T>) => TFormBuilderRef<T>;
	number: (
		props: IFormField<T> & { min?: number; max?: number }
	) => TFormBuilderRef<T>;
	password: (props: IFormField<T>) => TFormBuilderRef<T>;
	passwordConfirm: (
		props: IFormField<T> & { password: Path<T> }
	) => TFormBuilderRef<T>;
	image: (
		props: IFormField<T> & {
			id?: string;
			shape?: "circled" | "rounded" | "squared";
		}
	) => TFormBuilderRef<T>;
	phone: (props: IFormField<T>) => TFormBuilderRef<T>;
};

export interface IForm<T extends FieldValues> {
	defaultValues: DefaultValues<T>;
	onSubmitAsync: (values: T) => Promise<void>;
	submitButtonText: string;
	minHeight: number | string;
	fullwidth: boolean;
}

function FormBuilder<T extends FieldValues>(
	{
		defaultValues,
		onSubmitAsync,
		submitButtonText,
		minHeight,
		fullwidth,
	}: IForm<T>,
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
			email: (props) => {
				addInput(
					props.name,
					<InputEmail<T> {...props} control={control} />
				);
				return inputBuilder;
			},
			password: (props) => {
				addInput(
					props.name,
					<InputPassword<T> {...props} control={control} />
				);
				return inputBuilder;
			},
			passwordConfirm: ({ password, ...props }) => {
				addInput(
					props.name,
					<InputPasswordConfirm<T>
						{...props}
						control={control}
						onChange={() => watch(password)}
					/>
				);
				return inputBuilder;
			},
			image: (props) => {
				addInput(
					props.name,
					<InputImage<T> {...props} control={control} />
				);
				return inputBuilder;
			},
			text: (props) => {
				addInput(
					props.name,
					<InputText<T> {...props} control={control} />
				);
				return inputBuilder;
			},
			number: (props) => {
				addInput(
					props.name,
					<InputNumber<T> {...props} control={control} />
				);
				return inputBuilder;
			},
			phone: (props) => {
				addInput(
					props.name,
					<InputPhone<T> {...props} control={control} />
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
			style={{
				...formStyles,
				minHeight: minHeight,
				width: fullwidth ? "100%" : undefined,
			}}
		>
			{inputs.map((input) =>
				cloneElement(input, {
					key: input.props.name,
					disabled: isLoading,
				})
			)}
			<Button
				type="submit"
				disabled={isLoading}
				variant="contained"
				sx={{
					minwidth: "50%",
					margin: "16px",
					textTransform: "none",
				}}
			>
				{isLoading ? <CircularProgress size={24} /> : submitButtonText}
			</Button>
		</form>
	);
}

export default forwardRef(FormBuilder) as <T extends FieldValues>(
	props: IForm<T> & { ref: Ref<TFormBuilderRef<T>> }
) => ReactElement;
