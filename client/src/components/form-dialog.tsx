import { FieldValues } from "react-hook-form";
import Dialog, { DialogProps } from "./dialog";
import Form, { FormProps } from "./form/form";
import { useMediaQueryContext } from "../app/infrastructure/media-query-context";

export default function FormDialog<T extends FieldValues>({
	dialogProps,
	formProps,
}: {
	dialogProps: DialogProps;
	formProps: FormProps<T>;
}) {
	const { xs } = useMediaQueryContext();
	const { actions, ...fprops } = formProps;
	return (
		<Dialog {...dialogProps}>
			<Form
				{...fprops}
				actions={
					xs
						? (d) =>
								actions(d).map((a) => {
									a.componentProps = {
										...a.componentProps,
										fullWidth: true,
									};
									return a;
								})
						: actions
				}
				actionProps={
					xs
						? {
								position: "fixed",
								bottom: 6,
								left: -4,
								right: 0,
								width: "90%",
								marginX: "auto",
						  }
						: {}
				}
			/>
		</Dialog>
	);
}
