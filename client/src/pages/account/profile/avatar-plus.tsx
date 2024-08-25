import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import useApi from "../../../api/hooks/use-api.hook";
import { mediaApi } from "../../../api/endpoints/media.api";
import IconButton from "../../../components/buttons/icon-button";
import { usePopup } from "../../../app/hooks/use-popup.hook";
import Avatar from "../../../components/avatar";

export default function AvatarPlus({
	imageId = null,
	onChange,
}: {
	onChange: (id: string) => void;
	imageId?: string | null;
}) {
	const { fetchAsync } = useApi();
	const { popupError } = usePopup();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(imageId);

	useEffect(() => {
		if (!imageId) return;
		fetchAsync({
			request: mediaApi.getImageById(imageId),
		});
	}, []);

	const handleIconClick = () => {
		fileInputRef.current?.click();
	};

	async function handleFileChangeAsync(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const file = event.target.files?.[0];
		if (file) {
			const formData = new FormData();
			formData.append("file", file);
			fetchAsync({
				request: mediaApi.uploadFile(formData),
				onSuccess: (handler) =>
					handler
						.validate((res) => !!res.body)
						.do((res) => {
							setImageUrl(res.body!);
							onChange(res.body!);
						}),
				onError: (handler) => handler.log().popup(),
			});
		} else {
			popupError("Не удалось загрузить изображение.");
		}
	}

	return (
		<Box
			height={200}
			width={200}
			position="relative"
			borderRadius="50%"
			overflow="hidden"
			sx={{
				"&:hover .overlay": { opacity: 0.7 },
				"&:hover .editIcon": { opacity: 1 },
			}}
		>
			<Avatar imageId={imageUrl} size={"100%"} />

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
				tooltip="Редактировать"
				iconSx={{ fontSize: "2rem" }}
			/>

			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				accept=".jpg, .jpeg, .png"
				onChange={handleFileChangeAsync}
			/>
		</Box>
	);
}
