import { FC, useState, useEffect, ChangeEvent } from "react";
import { inputGroup } from "./InputGroup";

type input = Omit<inputGroup, "data"> & {
	id: string;
	value: string;
	onSelect: (selectedInput: string) => void;
};

const InputField: FC<input> = ({
	type,
	id,
	inputGroupName,
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
				name={inputGroupName}
				value={value}
				onChange={handleSelect}
			/>
			<label htmlFor={id}> {value} </label>
		</div>
	);
};

export { InputField };
