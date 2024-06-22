import {
	Box,
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	Typography,
} from "@mui/material";
import {
	Controller,
	ControllerRenderProps,
	FieldValues,
	Path,
} from "react-hook-form";
import { IFormBuilderField } from "./form-builder-field.interface";
import useApi from "../../../api/hooks/use-api.hook";
import { usePopup } from "../../../app/hooks/use-popup.hook";
import { useRef } from "react";
import { mediaApi } from "../../../api/media.api";
import IconButton from "../../icon-button";
import Avatar from "../../avatar";
import Image from "../../image";

export default function InputImage<T extends FieldValues>({
	control,
	name,
	id,
	label = "Изображение",
	size = "medium",
	variant = "filled",
	margin = "dense",
	required = false,
	disabled,
	readonly,
	shape = "rounded",
}: IFormBuilderField<T> & {
	id?: string;
	shape?: "rounded" | "squared" | "circled";
}) {
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
		<Controller
			control={control}
			name={name}
			rules={{
				pattern: {
					value: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
					message:
						"Что-то пошло не так. Обратитесь к администратору.",
				},
				required: {
					value: required,
					message: "Изображение обязательно",
				},
			}}
			render={({ field, fieldState: { error } }) => (
				<FormControl
					error={!!error}
					fullWidth
					margin={margin}
					sx={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column", // This ensures label is above the image
					}}
				>
					<Typography variant="caption">{label}</Typography>
					<Box
						sx={{
							position: "relative",
							width: 200,
							height: 200,
							overflow: "hidden",
							borderRadius:
								shape === "circled"
									? "50%"
									: shape === "rounded"
									? "5%"
									: 0,
							marginTop: 1, // Adjust spacing between label and image
							"&:hover .overlay": { opacity: 0.7 },
							"&:hover .editIcon": { opacity: 1 },
						}}
					>
						<Image
							imageId={field.value}
							size={"100%"}
							noImage="emptySpace"
						/>

						<Box
							className="overlay"
							sx={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								backgroundColor: "black",
								borderRadius:
									shape === "circled"
										? "50%"
										: shape === "rounded"
										? "5%"
										: 0,
								opacity: field.value ? 0 : 0.1,
								transition: "opacity 0.3s",
							}}
						/>
						{field.value && !disabled ? (
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
								centered
								fontSize={28}
								iconName="edit"
								onClick={handleIconClick}
								tip="Edit Avatar"
								iconSx={{ fontSize: "2rem" }}
							/>
						) : !field.value ? (
							<IconButton
								buttonSx={{
									width: "100%",
									height: "100%",
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
									color: "whitesmoke",
									opacity: 1,
								}}
								centered
								fontSize={28}
								iconName="add"
								onClick={handleIconClick}
								tip="Edit Avatar"
								iconSx={{ fontSize: "2rem" }}
							/>
						) : null}

						<input
							type="file"
							ref={fileInputRef}
							style={{ display: "none" }}
							accept=".jpg, .jpeg, .png"
							onChange={(e) => handleFileChangeAsync(e, field)}
						/>
					</Box>
					<FormHelperText>{error && error.message}</FormHelperText>
				</FormControl>
			)}
		/>
	);
}
