import { FC, useState, useEffect, ChangeEvent, ReactNode } from "react";
import "./App.css";
import { List } from "./components/list/List";
import { ReusableComponentsP96 } from "./practice/reusable_components/ReusableComponentsP96";
import { stories } from "./data";
import { InputWithLabel } from "./components/InputWithLabel";

export type inputWithLabelProps = {
	id: string;
	label: string;
	value: string;
	type?: string;
	children: ReactNode | string;
	onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const userStorageState = (key: string, initialState: string) => {
	const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);
	useEffect(() => {
		localStorage.setItem(key, value);
	}, [value, key]);
	return [value, setValue] as const;
};

const App: FC = () => {
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
			>
				Search:
			</InputWithLabel>
			<hr />
			<List list={searchedStories} />
			<ReusableComponentsP96 />
		</div>
	);
};

export { App };
