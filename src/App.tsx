import { FC } from "react";
import "./App.css";

interface Header {
	title: string;
	greeting: string;
}
const welcome: Header = {
	title: "the Road to React",
	greeting: "Hello, Friend",
};

// where to define TS top or bottom? or separately?
interface Story {
	title: string;
	url: string;
	author: string;
	num_comments: number;
	points: number;
	objectID: number;
}

interface ListProps {
	list: Story[];
}
// Variable names:
// the road to react app is calling for
// precise naming of variables naming: const stories:
// and for generic names in props: <List list={stories} />
// it is always a struggle for me to choose <List stories={stories} /> or even <Story stories={stories} />
// for this particular example List is better cause it's more reusable.
// Is <Story stories={stories} /> more common use case?

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
	return (
		<div className="top-wrapper">
			<Search />
			<hr />
			<List list={stories} />
			<PreventTouchEnd />
		</div>
	);
};

const Search: FC = () => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e);
		console.log(e.target.value);
	};
	const verifyBlurLog = () => {
		console.log(`input focused, mouse outside of the input field`);
	};

	return (
		<div className="search-wrapper">
			<h1>
				{welcome.title}: {welcome.greeting}
			</h1>
			<label htmlFor="search">Search: </label>
			<input
				id="search"
				type="text"
				onChange={handleChange}
				onBlur={verifyBlurLog}
			/>
		</div>
	);
};

const List: FC<ListProps> = ({ list }) => (
	<div>
		{list.map((item: Story) => (
			<ul className="technology" key={item.objectID}>
				<a href={item.url}>{item.title}</a>
				<li>Author: {item.author}</li>
				<li>Comments: {item.num_comments}</li>
				<li>Points: {item.points}</li>
			</ul>
		))}
	</div>
);

const PreventTouchEnd: FC = () => {
	// talk with mentor
	// page 53
	// event bubbling https://www.robinwieruch.de/react-event-bubbling-capturing/
	// recommended solution https://stackoverflow.com/questions/45612379/react-onclick-and-ontouchstart-fired-simultaneously/56970849#56970849
	const handleClick = (): void => {
		alert("click");
	};

	const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>): void => {
		alert("touchend");

		e.preventDefault();
	};

	return (
		<button type="button" onClick={handleClick} onTouchEnd={handleTouchEnd}>
			Click Me
		</button>
	);
};

export default App;
