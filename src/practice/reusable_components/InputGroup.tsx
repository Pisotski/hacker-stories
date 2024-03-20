import { FC, useState } from "react";
import { mockDataCharacterSet, mockDataCharacter } from "../../data";
import { InputField } from "./InputField";

export type inputGroup = {
	type: "button" | "checkbox" | "radio";
	inputGroupName?: string;
	data: mockDataCharacterSet;
};

const InputGroup: FC<inputGroup> = ({ type, inputGroupName, data }) => {
	const [selected, setSelected] = useState("");

	const handleSelect = (selectedInput: string) => {
		setSelected(selectedInput);
	};

	return (
		<>
			{data.map(({ id, name }: mockDataCharacter) => {
				return (
					<InputField
						key={id}
						type={type}
						id={id}
						inputGroupName={inputGroupName}
						value={name}
						onSelect={handleSelect}
					/>
				);
			})}
			{selected && <div>FavChar: {selected}</div>}
		</>
	);
};

export { InputGroup };
