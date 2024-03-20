import { FC, useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import { data } from "./data";
import { getRandomIntInclusive } from "./helpers";
import { InputGroup } from "./reusable_components/InputGroup";
import { Button } from "./reusable_components/Button";

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
			{data.map((mockDataCharacterSet, index) => (
				<div
					className="practice-reusable-components-p96"
					key={getRandomIntInclusive(0, 1000)}
				>
					<InputGroup
						type="radio"
						inputGroupName={"selected-answer-" + index}
						data={mockDataCharacterSet}
					/>
					<Button initialValue="Like" type="button" />
				</div>
			))}
			<InputGroup type="checkbox" data={data[0]} />
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

export { App };
