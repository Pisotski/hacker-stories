import { FC, useState, useEffect, ChangeEvent } from "react";
import { radioButtonGroup } from "./RadioButtonGroup";

type radioButton = Omit<radioButtonGroup, "data"> & {
	id: string;
	value: string;
	onSelect: (selectedInput: string) => void;
};

const RadioButton: FC<radioButton> = ({
	type,
	id,
	radioButtonGroupName,
	value,
	onSelect,
}) => {
	const [isChecked, setIsChecked] = useState(false);
	const [targetValue, setTargetValue] = useState("");

	const selectValue = () => {
		if (targetValue) onSelect(targetValue);
	};
	useEffect(selectValue, [isChecked]);

	const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
		setTargetValue(e.currentTarget.value);
		setIsChecked(!isChecked);
	};

	return (
		<div className="answer">
			<input
				type={type}
				id={id}
				name={radioButtonGroupName}
				value={value}
				onChange={handleSelect}
			/>
			<label htmlFor={id}> {value} </label>
		</div>
	);
};

export { RadioButton };
