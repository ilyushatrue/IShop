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
	SubmitHandler,
	useForm,
} from "react-hook-form";
import InputEmail from "./input/input-email";
import InputPassword from "./input/input-password";
import InputText from "./input/input-text";
import InputPhone from "./input/input-phone";
import { IFormField } from "./input/form-field.interface";
import { Button } from "@mui/material";

export type TFormRef<T extends FieldValues> = {
	addEmailInput: (props: IFormField<T>) => void;
	addTextInput: (props: IFormField<T>) => void;
	addPasswordInput: (props: IFormField<T>) => void;
	addPhoneInput: (props: IFormField<T>) => void;
	mountInputs: () => void;
};

export interface IForm<T extends FieldValues> {
	defaultValues: DefaultValues<T>;
}

function FormBuilder<T extends FieldValues>(
	{ defaultValues }: IForm<T>,
	ref: Ref<TFormRef<T>>
) {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<T>({
		mode: "onChange",
		reValidateMode: "onBlur",
		defaultValues,
	});

	const [fields, setFields] = useState<ReactElement[]>([]);

	const onSubmit: SubmitHandler<T> = (data) => {
		console.log(data);
	};

	const addEmailInput: TFormRef<T>["addEmailInput"] = (
		props: IFormField<T>
	) => {
		fields.push(
			<InputEmail<T>
				{...props}
				control={control}
				key={props.name}
				errorMessage={errors[props.name]?.message?.toString()}
			/>
		);
	};

	const addPasswordInput: TFormRef<T>["addPasswordInput"] = (
		props: IFormField<T>
	) => {
		fields.push(
			<InputPassword<T>
				{...props}
				control={control}
				key={props.name}
				errorMessage={errors[props.name]?.message?.toString()}
			/>
		);
	};

	const addTextInput: TFormRef<T>["addTextInput"] = (
		props: IFormField<T>
	) => {
		fields.push(
			<InputText<T>
				{...props}
				control={control}
				key={props.name}
				errorMessage={errors[props.name]?.message?.toString()}
			/>
		);
	};

	const addPhoneInput: TFormRef<T>["addPhoneInput"] = (
		props: IFormField<T>
	) => {
		fields.push(
			<InputPhone<T>
				{...props}
				control={control}
				key={props.name}
				errorMessage={errors[props.name]?.message?.toString()}
			/>
		);
	};

	const mountInputs: TFormRef<T>["mountInputs"] = () => {
		setFields([...fields]);
	};

	useImperativeHandle(ref, () => ({
		addTextInput,
		addEmailInput,
		addPasswordInput,
		addPhoneInput,
		mountInputs,
	}));

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{fields.map((field) => field)}
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
