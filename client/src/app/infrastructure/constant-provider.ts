type TConstant = "API_URL" | "IMAGES_PATH";
const getConstant = (name: TConstant): any => {
	switch (name) {
		case "API_URL":
			return process.env.REACT_APP_API_URL;
		case "IMAGES_PATH":
			return "/assets/images";
	}
};
export default getConstant;
