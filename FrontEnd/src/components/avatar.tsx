import { Avatar as MuiAvatar } from "@mui/material";
import getConstant from "../app/infrastructure/constant-provider";
import { useEffect } from "react";
import useApi from "../api/hooks/use-api.hook";
import { mediaApi } from "../api/media.api";

export default function Avatar({
	imageId,
	size = 32,
}: {
	imageId?: string | null;
	size?: number | string;
}) {
	const { fetchAsync } = useApi();
	function getImageSrc() {
		if (imageId) {
			return getConstant("API_URL") + "/media/image/" + imageId;
		} else {
			return getConstant("IMAGES_PATH") + "no-avatar.jpg";
		}
	}
	// useEffect(() => {
	// 	if (!imageId) return;
	// 	fetchAsync({
	// 		request: async () => await mediaApi.getImageById(imageId),
	// 	});
	// }, []);

	return (
		<MuiAvatar
			src={getImageSrc()}
			sx={{
				width: size,
				height: size,
			}}
		/>
	);
}
