import {
	CSSProperties,
	ReactElement,
	ReactNode,
	Ref,
	cloneElement,
	forwardRef,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import {
	Control,
	FieldValues,
	Path,
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormWatch,
} from "react-hook-form";
import InputEmail from "./inputs/input-email";
import InputPassword, { IFormPasswordField } from "./inputs/input-password";
import InputText from "./inputs/input-text";
import { InputPhone } from "./inputs/input-phone";
import InputPasswordConfirm from "./inputs/input-password-confirm";
import InputImage, { IFormImageField } from "./inputs/input-image";
import InputNumber, { IFormNumberField } from "./inputs/input-number";
import InputSelect, { IFormSelectField } from "./inputs/input-select";
import { IFormField } from "./inputs/form-field.interface";

const formStyles: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "end",
	alignItems: "center",
};

export type TFormBuilderRef<T extends FieldValues> = {
	select: (props: IFormSelectField<T>) => TFormBuilderRef<T>;
	email: (props: IFormField<T>) => TFormBuilderRef<T>;
	text: (props: IFormField<T>) => TFormBuilderRef<T>;
	number: (props: IFormNumberField<T>) => TFormBuilderRef<T>;
	password: (props: IFormPasswordField<T>) => TFormBuilderRef<T>;
	passwordConfirm: (
		props: IFormField<T> & { password: Path<T> }
	) => TFormBuilderRef<T>;
	image: (props: IFormImageField<T>) => TFormBuilderRef<T>;
	phone: (props: IFormField<T>) => TFormBuilderRef<T>;
};

export interface IForm<T extends FieldValues> {
	watch: UseFormWatch<T>;
	control: Control<T, any>;
	handleSubmit: UseFormHandleSubmit<T, undefined>;
	onSubmit: (values: T) => void;
	children: ReactNode;
	minHeight: number | string;
	fullwidth: boolean;
	loading: boolean;
}

function FormBuilder<T extends FieldValues>(
	{
		control,
		watch,
		handleSubmit,
		onSubmit,
		children,
		minHeight,
		fullwidth,
		loading,
	}: IForm<T>,
	ref: Ref<TFormBuilderRef<T>>
) {
	const [inputsMap, setInputsMap] = useState<Map<string, ReactElement>>(
		new Map()
	);
	const inputs = useMemo(() => Array.from(inputsMap.values()), [inputsMap]);

	const handleSubmitButtonClick: SubmitHandler<T> = async (data) => {
		onSubmit(data);
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
			select: (props) => {
				addInput(
					props.name,
					<InputSelect {...props} control={control} />
				);
				return inputBuilder;
			},
			email: (props) => {
				addInput(
					props.name,
					<InputEmail {...props} control={control} />
				);
				return inputBuilder;
			},
			password: (props) => {
				addInput(
					props.name,
					<InputPassword {...props} control={control} />
				);
				return inputBuilder;
			},
			passwordConfirm: ({ password, ...props }) => {
				addInput(
					props.name,
					<InputPasswordConfirm
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
					<InputImage {...props} control={control} />
				);
				return inputBuilder;
			},
			text: (props) => {
				addInput(
					props.name,
					<InputText {...props} control={control} />
				);
				return inputBuilder;
			},
			number: (props) => {
				addInput(
					props.name,
					<InputNumber {...props} control={control} />
				);
				return inputBuilder;
			},
			phone: (props) => {
				addInput(
					props.name,
					<InputPhone {...props} control={control} />
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
					enabled: !loading,
				})
			)}
			{children}
		</form>
	);
}

export default forwardRef(FormBuilder) as <T extends FieldValues>(
	props: IForm<T> & { ref: Ref<TFormBuilderRef<T>> }
) => ReactElement;
