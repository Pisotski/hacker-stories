import { FC, useState, useEffect, ChangeEvent } from "react";
import "./App.css";

interface Header {
	title: string;
	greeting: string;
}

interface Story {
	title: string;
	url: string;
	author: string;
	num_comments: number;
	points: number;
	objectID: number;
}

type ItemProps = Omit<Story, "objectID">;

interface ListProps {
	list: Story[];
}

type inputWithLabelProps = {
	id: string;
	label: string;
	value: string;
	type?: string;
	onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const welcome: Header = {
	title: "the Road to React",
	greeting: "Hello, Friend",
};

const userStorageState = (key: string, initialState: string) => {
	const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);
	useEffect(() => {
		localStorage.setItem(key, value);
	}, [value, key]);
	return [value, setValue] as const;
};

const App: FC = () => {
	const stories: Story[] = [
		{
			title: "React",
			url: "https://reactjs.org/",
			author: "Jordan Walke",
			num_comments: 3,
			points: 4,
			objectID: 0,
		},
		{
			title: "Redux",
			url: "https://redux.js.org/",
			author: "Dan Abramov, Andrew Clark",
			num_comments: 2,
			points: 5,
			objectID: 1,
		},
	];

	const [searchTerm, setSearchTerm] = userStorageState("search", "React");

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchTerm(value);
	};

	const searchedStories = stories.filter((story) =>
		story.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="top-wrapper">
			<InputWithLabel
				id="search"
				label="Search"
				value={searchTerm}
				onInputChange={handleSearch}
			/>
			<hr />
			<List list={searchedStories} />
			<PreventTouchEnd />
			<div id="practice-reusable-components-p96">
				<Button initialValue="Like" type="button" />
				<RadioButtonGroup type="radio" name="selected-answer" />
			</div>
		</div>
	);
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

const List: FC<ListProps> = ({ list }) => (
	<div>
		{list.map(({ objectID, ...item }) => (
			<Item key={objectID} {...item} />
		))}
	</div>
);

const Item: FC<ItemProps> = ({ url, title, author, num_comments, points }) => (
	<ul className="technology">
		<a href={url}>{title}</a>
		<li>Author: {author}</li>
		<li>Comments: {num_comments}</li>
		<li>Points: {points}</li>
	</ul>
);

// How to handle touch event and click event without one interrupting another
const PreventTouchEnd: FC = () => {
	const handleClick = (): void => {
		console.log("click");
	};

	const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>): void => {
		console.log("touchend");

		e.preventDefault();
	};

	return (
		<button type="button" onClick={handleClick} onTouchEnd={handleTouchEnd}>
			Click Me
		</button>
	);
};

// ************************
// P96: REUSABLE COMPONENTS
// ************************

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
// RADIO BUTTON
type radioButtonGroup = {
	type: "button" | "checkbox" | "radio";
	name: string;
};
const RadioButtonGroup: FC<radioButtonGroup> = ({ type, name }) => {
	const [selected, setSelected] = useState("");

	const handleSelect = (selectedInput: string) => {
		setSelected(selectedInput);
	};

	return (
		<>
			<RadioButton
				type={type}
				id="answer-1"
				name={name}
				value="Batman"
				onSelect={handleSelect}
			/>
			<RadioButton
				type={type}
				id="answer-2"
				name={name}
				value="Ironman"
				onSelect={handleSelect}
			/>
			<RadioButton
				type={type}
				id="answer-3"
				name={name}
				value="Invinsibleman"
				onSelect={handleSelect}
			/>
			{selected && <div>FavChar: {selected}</div>}
		</>
	);
};

type radioButton = radioButtonGroup & {
	id: string;
	value: string;
	onSelect: (selectedInput: string) => void;
};

const RadioButton: FC<radioButton> = ({ type, id, name, value, onSelect }) => {
	const [isChecked, setSelect] = useState(false);
	const [targetValue, setTargetValue] = useState("");

	const selectValue = () => {
		if (targetValue) onSelect(targetValue);
	};
	useEffect(selectValue, [isChecked, targetValue]);

	const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
		setTargetValue(e.currentTarget.value);
		setSelect(!isChecked);
		setSelect(!isChecked);
	};
	return (
		<div className="answer">
			<input
				type={type}
				id={id}
				name={name}
				value={value}
				onChange={handleSelect}
			/>
			<label htmlFor={id}> {value} </label>
		</div>
	);
};
// CHECKBOX
// DROPDOWN

export { App };
