import {
	ReactElement,
	Ref,
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

export type TFormRef<T extends FieldValues> = {
	addEmailInput: (props: IFormField<T>) => void;
	addTextInput: (props: IFormField<T>) => void;
	addPasswordInput: (props: IFormField<T>) => void;
	addPasswordConfirmInput: (props: IFormField<T>, watchFor: Path<T>) => void;
	addPhoneInput: (props: IFormField<T>) => void;
};

export interface IForm<T extends FieldValues> {
	defaultValues: DefaultValues<T>;
	onSubmit: (values: T) => void;
}

function FormBuilder<T extends FieldValues>(
	{ defaultValues, onSubmit }: IForm<T>,
	ref: Ref<TFormRef<T>>
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

	const addEmailInput: TFormRef<T>["addEmailInput"] = (
		props: IFormField<T>
	) => {
		setFields((prevFields) => [
			...prevFields,
			<InputEmail<T> {...props} control={control} key={props.name} />,
		]);
	};

	const addPasswordInput: TFormRef<T>["addPasswordInput"] = (
		props: IFormField<T>
	) => {
		setFields((prevFields) => [
			...prevFields,
			<InputPassword<T> {...props} control={control} key={props.name} />,
		]);
	};

	const addPasswordConfirmInput: TFormRef<T>["addPasswordConfirmInput"] = (
		props: IFormField<T>,
		watchFor: Path<T>
	) => {
		setFields((prevFields) => [
			...prevFields,
			<InputPasswordConfirm<T>
				{...props}
				control={control}
				key={props.name}
				watch={watch}
				watchFor={watchFor}
			/>,
		]);
	};

	const addTextInput: TFormRef<T>["addTextInput"] = (
		props: IFormField<T>
	) => {
		setFields((prevFields) => [
			...prevFields,
			<InputText<T> {...props} control={control} key={props.name} />,
		]);
	};

	const addPhoneInput: TFormRef<T>["addPhoneInput"] = (
		props: IFormField<T>
	) => {
		setFields((prevFields) => [
			...prevFields,
			<InputPhone<T> {...props} control={control} key={props.name} />,
		]);
	};

	useImperativeHandle(ref, () => ({
		addTextInput,
		addEmailInput,
		addPasswordInput,
		addPasswordConfirmInput,
		addPhoneInput,
	}));

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
				Submit
			</Button>
		</form>
	);
}

export default forwardRef(FormBuilder) as <T extends FieldValues>(
	props: IForm<T> & { ref?: Ref<TFormRef<T>> }
) => ReactElement;
