import { FC, ReactNode, ChangeEvent } from "react";

interface Header {
	title: string;
	greeting: string;
}

const welcome: Header = {
	title: "the Road to React",
	greeting: "Hello, Friend",
};

export type inputWithLabelProps = {
	id: string;
	label: string;
	value: string;
	type?: string;
	children: ReactNode | string;
	isFocused: boolean;
	onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
			<div>
				<h1>
					{welcome.title}: {welcome.greeting}
				</h1>
				<label htmlFor={id}>{label}</label>
				<input id={id} type={type} value={value} onChange={onInputChange} />
				<p>{value}</p>
			</div>
		</>
	);
};

export { InputWithLabel };
