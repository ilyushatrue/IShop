import { IconButton, Modal } from "components";
import { MouseEvent, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { IInputProps } from "api/interfaces/IInputProps";
import { RRule } from "rrule";

import RecurrenceRuleFormContainer from "./RRuleForm";

export default function InputRRule2({
	value,
	onChangeValue,
	readonly,
	...props
}: IInputProps<string | undefined>) {
	const [isOpen, setIsOpen] = useState(false);
	const [rrule, setRRule] = useState<RRule>();

	function handleSubmit(values: RRule) {
		setIsOpen(false);
		onChangeValue(values.toString());
	}

	useEffect(() => {
		if (!value?.trim()) {
			onChangeValue("");
			return;
		}
		const instance = new RRule(RRule.parseString(value));
		setRRule(instance);
		onChangeValue(instance.toString());
	}, [value]);

	const toggleOpen = (open: boolean) => (e: MouseEvent<unknown>) => {
		e.stopPropagation();
		setIsOpen(open);
	};

	const eraseValue = (e: MouseEvent<unknown>) => {
		e.stopPropagation();
		setRRule(undefined);
		onChangeValue("");
	};

	const handleCancel = () => {
		setIsOpen(false);
	};

	return (
		<>
			<TextField
				{...props}
				size="small"
				value={rrule?.toText() ?? ""}
				onClick={toggleOpen(true)}
				InputProps={{
					readOnly: true,
					endAdornment: (
						<>
							<IconButton
								size="small"
								name="close"
								disabled={!rrule}
								onClick={eraseValue}
								color="primary"
							/>
							<IconButton
								size="small"
								name="edit"
								onClick={toggleOpen(true)}
								color="primary"
							/>
						</>
					),
				}}
			/>
			<Modal
				title="Расписание"
				open={isOpen}
				onClose={toggleOpen(false)}
				fullWidth
				responsiveWidth
			>
				<RecurrenceRuleFormContainer
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					rrule={rrule}
				/>
			</Modal>
		</>
	);
}
