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
import InputEmail from "./input/InputEmail";
import InputPassword from "./input/InputPassword";
import InputText from "./input/InputText";
import InputPhone from "./input/InputPhone";

export type TFormRef<T extends FieldValues> = {
	addEmailInput: (name: Path<T>) => void;
	addTextInput: (name: Path<T>) => void;
	addPasswordInput: (name: Path<T>) => void;
	addPhoneInput: (name: Path<T>) => void;
	useFields: () => void;
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

	function addEmailInput(name: Path<T>) {
		fields.push(
			<InputEmail<T>
				key={name as string}
				control={control}
				name={name}
				errorMessage={errors[name]?.message?.toString()}
			/>
		);
	}

	function addPasswordInput(name: Path<T>) {
		fields.push(
			<InputPassword<T>
				key={name as string}
				control={control}
				name={name}
				errorMessage={errors[name]?.message?.toString()}
			/>
		);
	}
	function addTextInput(name: Path<T>) {
		fields.push(
			<InputText<T>
				key={name as string}
				control={control}
				name={name}
				errorMessage={errors[name]?.message?.toString()}
			/>
		);
	}

	function addPhoneInput(name: Path<T>) {
		fields.push(
			<InputPhone<T>
				key={name as string}
				control={control}
				name={name}
				errorMessage={errors[name]?.message?.toString()}
			/>
		);
	}
	function mountFields() {
		setFields([...fields]);
	}

	useImperativeHandle(ref, () => ({
		addTextInput,
		addEmailInput,
		addPasswordInput,
		addPhoneInput,
		useFields: mountFields,
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
