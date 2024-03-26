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
import { getAsyncStories, Story } from "./data";
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
	STORIES_FETCH_INIT = "STORIES_FETCH_INIT",
	STORIES_FETCH_SUCCESS = "STORIES_FETCH_SUCCESS",
	REMOVE_STORY = "REMOVE_STORY",
	STORIES_FETCH_FAILURE = "STORIES_FETCH_FAILURE",
}

type StoriesFetchSuccessAction = {
	type: "STORIES_FETCH_SUCCESS";
	payload: Story[];
};

type StoriesRemoveAction = {
	type: "REMOVE_STORY";
	payload: Story;
};

type StoriesFetchInitAction = {
	type: "STORIES_FETCH_INIT";
	payload?: null;
};

type StoriesFetchFailureAction = {
	type: "STORIES_FETCH_FAILURE";
	payload?: null;
};

type StoriesState = {
	isLoading: boolean;
	isError: boolean;
	data: Story[];
};

type StoriesAction =
	| StoriesFetchSuccessAction
	| StoriesRemoveAction
	| StoriesFetchInitAction
	| StoriesFetchFailureAction;

const storiesReducer = (
	state: StoriesState,
	{ type, payload }: StoriesAction
) => {
	switch (type) {
		case ActionType.STORIES_FETCH_INIT:
			return {
				...state,
				isLoading: true,
				isError: false,
			};

		case ActionType.STORIES_FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				data: payload,
			};

		case ActionType.STORIES_FETCH_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
			};

		case ActionType.REMOVE_STORY:
			const newStories = state.data.filter(
				(story: Story) => payload.objectID !== story.objectID
			);
			return { ...state, data: newStories };
		default:
			throw new Error();
	}
};
const App: FC = () => {
	const [searchTerm, setSearchTerm] = userStorageState("search", "React");
	const [stories, dispatchStories] = useReducer(storiesReducer, {
		isLoading: true,
		isError: false,
		data: [],
	});

	useEffect(() => {
		dispatchStories({
			type: ActionType.STORIES_FETCH_INIT,
		});
		getAsyncStories()
			.then((result) => {
				dispatchStories({
					type: ActionType.STORIES_FETCH_SUCCESS,
					payload: result.hits,
				});
			})
			.catch(() =>
				dispatchStories({
					type: ActionType.STORIES_FETCH_FAILURE,
				})
			);
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

	const searchedStories = stories.data.filter((story: Story) =>
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
			{stories.isError && <p>Something went wrong ...</p>}

			{stories.isLoading ? (
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
