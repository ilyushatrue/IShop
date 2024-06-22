import { Box } from "@mui/material";
import {
	Controller,
	ControllerRenderProps,
	FieldValues,
	Path,
} from "react-hook-form";
import { IFormBuilderField } from "./form-builder-field.interface";
import useApi from "../../../api/hooks/use-api.hook";
import { usePopup } from "../../../app/hooks/use-popup.hook";
import { useEffect, useRef } from "react";
import { mediaApi } from "../../../api/media.api";
import IconButton from "../../icon-button";
import Avatar from "../../avatar";

export default function InputImage<T extends FieldValues>({
	control,
	name,
	id,
	label,
	size = "medium",
	variant = "filled",
	margin = "dense",
	required = false,
	disabled,
	readonly,
}: IFormBuilderField<T> & { id?: string }) {
	const { fetchAsync } = useApi();
	const { popupError } = usePopup();
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleIconClick = () => {
		fileInputRef.current?.click();
	};

	async function handleFileChangeAsync(
		event: React.ChangeEvent<HTMLInputElement>,
		field: ControllerRenderProps<T, Path<T>>
	) {
		const file = event.target.files?.[0];
		if (file) {
			const formData = new FormData();
			formData.append("file", file);
			await fetchAsync({
				request: async () => await mediaApi.uploadFile(formData),
				onSuccess: (handler) =>
					handler
						.validate((res) => !!res.body)
						.do((res) => field.onChange(res.body!.value!)),
				onError: (handler) => handler.log().popup(),
			});
		} else {
			popupError("Не удалось загрузить изображение.");
		}
	}
	return (
		// <TextField
		// 	label={label + (required ? " *" : "")}
		// 	margin={margin}
		// 	type="text"
		// 	size={size}
		// 	variant={variant}
		// 	disabled={disabled}
		// 	InputProps={{ readOnly: readonly }}
		// 	fullWidth
		// 	onChange={field.onChange}
		// 	value={field.value}
		// 	error={!!error}
		// 	helperText={error ? error.message : ""}
		// />
		<Controller
			control={control}
			name={name}
			rules={{
				pattern: {
					value: new RegExp(
						"^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
					),
					message:
						"Что-то пошло не так. Обратитесь к администратору.",
				},
				required: {
					value: required,
					message: "Обязательно для заполнения",
				},
			}}
			render={({ field, fieldState: { error } }) => (
				<Box
					height={200}
					width={200}
					position="relative" // Разместите контент в относительном положении
					borderRadius="50%"
					overflow="hidden"
					sx={{
						"&:hover .overlay": { opacity: 0.7 },
						"&:hover .editIcon": { opacity: 1 },
					}} // Установим эффекты hover
				>
					<Avatar imageId={field.value} size={"100%"} />

					<Box
						className="overlay"
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							backgroundColor: "black",
							borderRadius: "50%",
							opacity: 0,
							transition: "opacity 0.3s",
						}}
					/>

					<IconButton
						buttonSx={{
							width: "100%",
							height: "100%",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							color: "white",
							opacity: 0,
							transition: "opacity 0.3s",
						}}
						iconName="edit"
						onClick={handleIconClick}
						tip="Edit Avatar"
						iconSx={{ fontSize: "2rem" }}
					/>

					<input
						type="file"
						ref={fileInputRef}
						style={{ display: "none" }}
						accept=".jpg, .jpeg, .png"
						onChange={(e) => handleFileChangeAsync(e, field)}
					/>
				</Box>
			)}
		/>
	);
}
