import { FC, useState, useEffect } from "react";

type button = {
	initialValue: string;
	type?: "submit" | "reset" | "button";
};
// BUTTON
const Button: FC<button> = ({ initialValue, type }) => {
	const [toggle, setToggle] = useState(true);
	const [value, setValue] = useState(initialValue);

	const buttonEffect = () => {
		toggle ? setValue("Like") : setValue("Dislike");
	};

	useEffect(buttonEffect, [toggle]);

	const handleClick = () => {
		setToggle(!toggle);
		console.log(toggle, value);
	};

	return (
		<button type={type} value={value} onClick={handleClick}>
			{value}
		</button>
	);
};

export { Button };
