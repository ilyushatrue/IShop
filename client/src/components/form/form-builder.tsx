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

const fieldBoxStyles: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "end",
	alignItems: "center",
};

export type FormBuilderRef<T extends FieldValues> = {
	select: (props: IFormSelectField<T>) => FormBuilderRef<T>;
	email: (props: IFormField<T>) => FormBuilderRef<T>;
	text: (props: IFormField<T>) => FormBuilderRef<T>;
	number: (props: IFormNumberField<T>) => FormBuilderRef<T>;
	password: (props: IFormPasswordField<T>) => FormBuilderRef<T>;
	passwordConfirm: (
		props: IFormField<T> & { password: Path<T> }
	) => FormBuilderRef<T>;
	image: (props: IFormImageField<T>) => FormBuilderRef<T>;
	phone: (props: IFormField<T>) => FormBuilderRef<T>;
};

export interface IForm<T extends FieldValues> {
	watch: UseFormWatch<T>;
	control: Control<T, any>;
	handleSubmit: UseFormHandleSubmit<T, undefined>;
	onSubmit: (values: T) => void;
	children: ReactNode;
	fullwidth: boolean;
	loading: boolean;
	style?: CSSProperties;
}

function FormBuilder<T extends FieldValues>(
	{
		control,
		watch,
		handleSubmit,
		onSubmit,
		children,
		fullwidth,
		loading,
		style,
	}: IForm<T>,
	ref: Ref<FormBuilderRef<T>>
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

	const inputBuilder: FormBuilderRef<T> = useMemo(
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
			style={{ ...style, width: fullwidth ? "100%" : undefined }}
		>
			<div style={fieldBoxStyles}>
				{inputs.map((input) =>
					cloneElement(input, {
						key: input.props.name,
						disabled: input.props.disabled || loading,
					})
				)}
			</div>
			{children}
		</form>
	);
}

export default forwardRef(FormBuilder) as <T extends FieldValues>(
	props: IForm<T> & { ref: Ref<FormBuilderRef<T>> }
) => ReactElement;
