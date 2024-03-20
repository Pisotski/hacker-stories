import { FC, useState } from "react";
import { mockDataCharacterSet, mockDataCharacter } from "../data";
import { RadioButton } from "./RadioButton";

export type radioButtonGroup = {
	type: "button" | "checkbox" | "radio";
	radioButtonGroupName?: string;
	data: mockDataCharacterSet;
};

const RadioButtonGroup: FC<radioButtonGroup> = ({
	type,
	radioButtonGroupName,
	data,
}) => {
	const [selected, setSelected] = useState("");

	const handleSelect = (selectedInput: string) => {
		setSelected(selectedInput);
	};

	return (
		<>
			{data.map(({ id, name }: mockDataCharacter) => {
				return (
					<RadioButton
						key={id}
						type={type}
						id={id}
						radioButtonGroupName={radioButtonGroupName}
						value={name}
						onSelect={handleSelect}
					/>
				);
			})}
			{selected && <div>FavChar: {selected}</div>}
		</>
	);
};

export { RadioButtonGroup };
