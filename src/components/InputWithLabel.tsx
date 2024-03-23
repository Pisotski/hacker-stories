import { FC } from "react";
import { inputWithLabelProps } from "../App";
interface Header {
	title: string;
	greeting: string;
}

const welcome: Header = {
	title: "the Road to React",
	greeting: "Hello, Friend",
};

const InputWithLabel: FC<inputWithLabelProps> = ({
	id,
	label,
	type = "text",
	value,
	onInputChange,
}) => {
	return (
		<>
			<h1>
				{welcome.title}: {welcome.greeting}
			</h1>
			<label htmlFor={id}>{label}</label>
			<input id={id} type={type} value={value} onChange={onInputChange} />
			<p>{value}</p>
		</>
	);
};

export { InputWithLabel };
