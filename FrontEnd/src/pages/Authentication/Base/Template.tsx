import {
	Avatar,
	Box,
	Button,
	FilledTextFieldProps,
	TextField,
} from "@mui/material";
import React, {
	CSSProperties,
	ChangeEvent,
	HTMLInputTypeAttribute,
	ReactNode,
} from "react";
import { Formik, Field, Form, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import PhoneInput from "../../../components/input/phone/InputPhone";

export interface IFormField {
	label: string;
	name: string;
	placeholder: string;
	type?: HTMLInputTypeAttribute;
	isRequired?: boolean;
}

const containerStyle: CSSProperties = {
	padding: 36,
	width: "90vw",
	maxWidth: "380px",
	margin: "24px auto",
	backgroundColor: "white",
	borderRadius: 50,
	boxShadow: "0px 0px 24px rgba(0,0,0,0.05)",
};

const textFieldProps: FilledTextFieldProps = {
	variant: "filled",
	fullWidth: true,
	sx: {
		input: {
			bgcolor: "white",
		},
	},
};

const avatarStyle: CSSProperties = {
	height: 48,
	width: 48,
};

interface IProps {
	sm?: boolean;
	children?: ReactNode;
	validationSchema: Yup.ObjectSchema<any>;
	title: string;
	initialValues: any;
	avatarChildren: ReactNode;
	fields: IFormField[];
	onChange?: (name: string, value: string) => void;
	buttonLabel: string;
	onSumbit: (data: any) => void;
}

export default function Template({
	sm = false,
	avatarChildren,
	initialValues,
	validationSchema,
	title,
	children,
	fields = [],
	onChange,
	onSumbit,
	buttonLabel,
}: IProps) {
	function handleOnSubmit(values: any, props: any) {
		onSumbit(values);
	}

	function handlePhoneInputChange(
		e: ChangeEvent<HTMLInputElement>,
		formikProps: FormikProps<any>
	) {
		const phoneMaxLength = 11;
		const countryCodeDigit = "7";
		const inputDigits = e.target.value.replace(/[^\d]/g, "");
		if (inputDigits.length === 1) {
			if (inputDigits.startsWith(countryCodeDigit) || inputDigits.startsWith("8")) {
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

	return (
		<Box
			style={containerStyle}
			sx={{
				display: "flex",
				justifyContent: "start",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<Box display={"flex"} alignItems={"center"} gap={2}>
				<Avatar style={avatarStyle} sx={{ bgcolor: "secondary.light" }}>
					{avatarChildren}
				</Avatar>
				<h2>{title}</h2>
			</Box>
			<Box
				display={"flex"}
				flexDirection={"column"}
				alignItems={"center"}
				flexGrow={1}
				width={"100%"}
			>
				<Formik
					initialValues={initialValues}
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
											helperText={
												<ErrorMessage name={field.name}>
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
											}
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
											helperText={
												<ErrorMessage name={field.name}>
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
											}
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
			</Box>
			<Box
				display={"flex"}
				flexDirection={"column"}
				alignItems={"start"}
				width={"100%"}
				gap={0.5}
			>
				{children}
			</Box>
		</Box>
	);
}
