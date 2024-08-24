import { ButtonProps, Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const GradientButton = styled(MuiButton)(({ theme }) => ({
	borderRadius: 10,
	textTransform: "none",
	paddingLeft: 20,
	paddingRight: 20,
	borderColor: theme.palette.secondary.light,
	color: theme.palette.secondary.light,
	"&:hover": {
		borderColor: theme.palette.secondary.dark,
		color: theme.palette.secondary.dark,
	},
}));

export default function OutlinedButton({ ...props }: ButtonProps) {
	return <GradientButton {...props} variant="outlined" color="secondary" />;
}
