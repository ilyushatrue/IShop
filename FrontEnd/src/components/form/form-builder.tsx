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

	const addEmailInput: TFormRef<T>["addEmailInput"] = ({
		name,
		label,
	}: IFormField<T>) => {
		fields.push(
			<InputEmail<T>
				key={name}
				control={control}
				name={name}
				label={label}
				errorMessage={errors[name]?.message?.toString()}
			/>
		);
	};
	
	const addPasswordInput: TFormRef<T>["addPasswordInput"] = ({
		name,
		label,
	}: IFormField<T>) => {
		fields.push(
			<InputPassword<T>
				key={name as string}
				control={control}
				name={name}
				label={label}
				errorMessage={errors[name]?.message?.toString()}
			/>
		);
	};

	const addTextInput: TFormRef<T>["addTextInput"] = ({
		name,
		label,
	}: IFormField<T>) => {
		fields.push(
			<InputText<T>
				key={name as string}
				control={control}
				name={name}
				label={label}
				errorMessage={errors[name]?.message?.toString()}
			/>
		);
	};

	const addPhoneInput: TFormRef<T>["addPhoneInput"] = ({
		name,
		label,
	}: IFormField<T>) => {
		fields.push(
			<InputPhone<T>
				key={name as string}
				control={control}
				name={name}
				label={label}
				errorMessage={errors[name]?.message?.toString()}
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
		<form onSubmit={handleSubmit(onSubmit)}>
			{fields.map((field) => field)}
			<button type="submit">Submit</button>
		</form>
	);
}

export default forwardRef(FormBuilder) as <T extends FieldValues>(
	props: IForm<T> & { ref?: Ref<TFormRef<T>> }
) => ReactElement;
