import { Avatar as MuiAvatar } from "@mui/material";
import getConstant from "../app/infrastructure/constant-provider";

export default function Avatar({
	imageId,
	size = 32,
}: {
	imageId?: string | null;
	size?: number | string;
}) {
	function getImageSrc() {
		if (imageId) {
			return getConstant("API_URL") + "/media/image/" + imageId;
		} else {
			return getConstant("IMAGES_PATH") + "/images/no-avatar.jpg";
		}
	}

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
