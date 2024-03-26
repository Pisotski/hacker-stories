import {
	useState,
	useEffect,
	useReducer,
	FC,
	ChangeEvent,
	ReactNode,
} from "react";
import "./App.css";
import { List } from "./components/list/List";
import { ReusableComponentsP96 } from "./components/exercises/reusable_components/ReusableComponentsP96";
import { getData, Story } from "./data";
import { InputWithLabel } from "./components/InputWithLabel";
import { Slider } from "./components/exercises/Slider";

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

enum ActionType {
	SET_STORIES = "SET_STORIES",
	REMOVE_STORY = "REMOVE_STORY",
}

type StoriesState = Story[];

type StoriesSetAction = {
	type: "SET_STORIES";
	payload: StoriesState;
};

type StoriesRemoveAction = {
	type: "REMOVE_STORY";
	payload: Story;
};

type StoriesAction = StoriesSetAction | StoriesRemoveAction;

const storiesReducer = (
	state: StoriesState,
	{ type, payload }: StoriesAction
) => {
	switch (type) {
		case ActionType.SET_STORIES:
			return payload;
		case ActionType.REMOVE_STORY:
			const newStories = state.filter(
				(story: Story) => payload.objectID !== story.objectID
			);
			return newStories;
		default:
			throw new Error();
	}
};
const App: FC = () => {
	const [searchTerm, setSearchTerm] = userStorageState("search", "React");
	const [stories, dispatchStories] = useReducer(storiesReducer, []);

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getData()
			.then((result) => {
				dispatchStories({
					type: ActionType.SET_STORIES,
					payload: result.data.initialStories,
				});
				setIsLoading(false);
			})
			.catch(() => setIsError(true));
	}, []);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchTerm(value);
	};

	const handleRemoveItem = (item: Story) => {
		dispatchStories({
			type: ActionType.REMOVE_STORY,
			payload: item,
		});
	};

	const searchedStories = stories.filter((story: Story) =>
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
			{isError && <p>Something went wrong ...</p>}

			{isLoading ? (
				<div>Loading</div>
			) : (
				<List list={searchedStories} handleRemoveItem={handleRemoveItem} />
			)}
			<Slider />
			<ReusableComponentsP96 />
		</div>
	);
};

export { App };
