import { Box, Button, FilledTextFieldProps, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import React, { ChangeEvent } from "react";
import PhoneInput from "../fields/phone/input-phone";
import * as Yup from "yup";
import { IFormField } from "../fields/IFormField";

interface IProps<T> {
	sm?: boolean;
	validationSchema: Yup.ObjectSchema<any>;
	initialValues: T;
	fields: IFormField[];
	onChange?: (name: string, value: string) => void;
	buttonLabel: string;
	onSubmit: (values: any, props: any) => void;
}

const textFieldProps: FilledTextFieldProps = {
	variant: "filled",
	fullWidth: true,
	sx: {
		input: {
			bgcolor: "white",
		},
	},
};

export default function ValidationForm<T>({
	sm = false,
	initialValues,
	validationSchema,
	fields = [],
	onChange,
	onSubmit,
	buttonLabel,
}: IProps<T>) {
	function handleOnSubmit(values: any, props: any) {
		onSubmit(values, props);
	}

	function handlePhoneInputChange(
		e: ChangeEvent<HTMLInputElement>,
		formikProps: FormikProps<any>
	) {
		const phoneMaxLength = 11;
		const countryCodeDigit = "7";
		const countryCodeDigit2 = "8";
		const inputDigits = e.target.value.replace(/[^\d]/g, "");
		if (inputDigits.length === 1) {
			if (
				inputDigits.startsWith(countryCodeDigit) ||
				inputDigits.startsWith(countryCodeDigit2)
			) {
				e.target.value = countryCodeDigit;
			} else {
				e.target.value = countryCodeDigit + inputDigits;
			}
		} else if (inputDigits.length === phoneMaxLength) {
			e.target.value = countryCodeDigit + e.target.value.substring(2);
		}
		handleInputChange("phone", e.target.value, formikProps);
	}

	function handleInputChange(
		fieldName: string,
		value: string,
		formikProps: FormikProps<any>
	) {
		formikProps.setFieldValue(fieldName, value);
	}

	function getErrorMessage(fieldName: string) {
		return (
			<ErrorMessage name={fieldName}>
				{(msg) => (
					<span
						style={{
							color: "red",
						}}
					>
						{msg}
					</span>
				)}
			</ErrorMessage>
		);
	}

	return (
		<Formik
			initialValues={initialValues as any}
			onSubmit={handleOnSubmit}
			validationSchema={validationSchema}
		>
			{(props) => (
				<Form
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{fields.map((field, index) => (
						<Box key={index} width={"100%"}>
							{field.name === "phone" ? (
								<PhoneInput
									sm={sm}
									required={field.isRequired}
									helperText={getErrorMessage(field.name)}
									onChange={(e) =>
										handlePhoneInputChange(e, props)
									}
								/>
							) : (
								<Field
									{...textFieldProps}
									size={sm ? "medium" : "small"}
									as={TextField}
									autoComplete="on"
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										handleInputChange(
											field.name,
											e.target.value,
											props
										)
									}
									helperText={getErrorMessage(field.name)}
									name={field.name}
									label={
										field.isRequired
											? field.label + " *"
											: field.label
									}
									placeholder={field.placeholder}
									type={field.type}
								/>
							)}
						</Box>
					))}
					<Button
						type="submit"
						disableElevation
						variant="contained"
						sx={{
							marginTop: 4,
							marginBottom: 3,
							marginX: "auto",
							minWidth: "50%",
							borderRadius: 3,
						}}
					>
						{buttonLabel}
					</Button>
				</Form>
			)}
		</Formik>
	);
}
