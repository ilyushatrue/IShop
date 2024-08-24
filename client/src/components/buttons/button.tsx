import { ButtonProps, Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const GradientButton = styled(MuiButton)({
	background:
		"linear-gradient(90deg, rgb(227, 141, 79) 10%, rgb(240, 115, 26) 90%)",
	borderRadius: 10,
	boxShadow: "0 3px 5px 2px rgba(227, 141, 79, .3)",
	color: "white",
	textTransform: "none",
	paddingLeft: 20,
	paddingRight: 20,
});

export default function Button({ ...props }: ButtonProps) {
	return <GradientButton {...props} />;
}
