import { FC, useState, useEffect } from "react";

type button = {
	type: "submit" | "reset" | "button";
	values: {
		trueValue: string;
		falseValue?: string;
	};
};
// BUTTON

const Button: FC<button> = ({ type, values }) => {
	const [toggle, setToggle] = useState(true);
	const [value, setValue] = useState(values.trueValue);

	const buttonEffect = () => {
		if (values.falseValue) {
			toggle ? setValue(values.trueValue) : setValue(values.falseValue);
		}
	};

	useEffect(buttonEffect, [toggle]);

	const handleClick = () => {
		setToggle(!toggle);
	};

	return (
		<button type={type} value={value} onClick={handleClick}>
			{value}
		</button>
	);
};

export { Button };
