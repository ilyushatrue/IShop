import {
	ReactElement,
	Ref,
	RefObject,
	forwardRef,
	useImperativeHandle,
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
import { Button } from "@mui/material";
import InputPasswordConfirm from "./input/input-password-confirm";

export type TFormBuilderRef<T extends FieldValues> = {
	addEmailInput: (props: IFormField<T>) => TFormBuilderRef<T> | null;
	addTextInput: (props: IFormField<T>) => TFormBuilderRef<T> | null;
	addPasswordInput: (props: IFormField<T>) => TFormBuilderRef<T> | null;
	addPasswordConfirmInput: (
		props: IFormField<T>,
		watchFor: Path<T>
	) => TFormBuilderRef<T> | null;
	addPhoneInput: (props: IFormField<T>) => TFormBuilderRef<T> | null;
};

export interface IForm<T extends FieldValues> {
	defaultValues: DefaultValues<T>;
	onSubmit: (values: T) => void;
	submitButtonText: string;
}

function FormBuilder<T extends FieldValues>(
	{ defaultValues, onSubmit, submitButtonText }: IForm<T>,
	ref: Ref<TFormBuilderRef<T>>
) {
	const { handleSubmit, control, watch } = useForm<T>({
		mode: "onChange",
		reValidateMode: "onBlur",
		defaultValues,
	});

	const [fields, setFields] = useState<ReactElement[]>([]);

	const handleSubmitButtonClick: SubmitHandler<T> = (data) => {
		onSubmit(data);
	};

	const inputExists: (key: Path<T>) => boolean = (key: Path<T>) => {
		return fields.map((f) => f.key).includes(key);
	};

	const addEmailInput: TFormBuilderRef<T>["addEmailInput"] = (
		props: IFormField<T>
	) => {
		if (!inputExists(props.name)) {
			setFields((prevFields) => [
				...prevFields,
				<InputEmail<T> {...props} control={control} key={props.name} />,
			]);
		}
		return (ref as RefObject<TFormBuilderRef<T>>).current;
	};

	const addPasswordInput: TFormBuilderRef<T>["addPasswordInput"] = (
		props: IFormField<T>
	) => {
		if (!inputExists(props.name)) {
			setFields((prevFields) => [
				...prevFields,
				<InputPassword<T>
					{...props}
					control={control}
					key={props.name}
				/>,
			]);
		}
		return (ref as RefObject<TFormBuilderRef<T>>).current;
	};

	const addPasswordConfirmInput: TFormBuilderRef<T>["addPasswordConfirmInput"] =
		(props: IFormField<T>, watchFor: Path<T>) => {
			if (!inputExists(props.name)) {
				setFields((prevFields) => [
					...prevFields,
					<InputPasswordConfirm<T>
						{...props}
						control={control}
						key={props.name}
						onChange={() => watch(watchFor)}
					/>,
				]);
			}
			return (ref as RefObject<TFormBuilderRef<T>>).current;
		};

	const addTextInput: TFormBuilderRef<T>["addTextInput"] = (
		props: IFormField<T>
	) => {
		if (!inputExists(props.name)) {
			setFields((prevFields) => [
				...prevFields,
				<InputText<T> {...props} control={control} key={props.name} />,
			]);
		}
		return (ref as RefObject<TFormBuilderRef<T>>).current;
	};

	const addPhoneInput: TFormBuilderRef<T>["addPhoneInput"] = (
		props: IFormField<T>
	) => {
		if (!inputExists(props.name)) {
			setFields((prevFields) => [
				...prevFields,
				<InputPhone<T> {...props} control={control} key={props.name} />,
			]);
		}
		return (ref as RefObject<TFormBuilderRef<T>>).current;
	};

	useImperativeHandle(ref, () => ({
		addTextInput,
		addEmailInput,
		addPasswordInput,
		addPasswordConfirmInput,
		addPhoneInput,
	}));

	console.log(fields);
	return (
		<form
			onSubmit={handleSubmit(handleSubmitButtonClick)}
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{fields}
			<Button
				type="submit"
				variant="contained"
				sx={{ width: "50%", margin: "16px" }}
			>
				{submitButtonText}
			</Button>
		</form>
	);
}

export default forwardRef(FormBuilder) as <T extends FieldValues>(
	props: IForm<T> & { ref?: Ref<TFormBuilderRef<T>> }
) => ReactElement;
