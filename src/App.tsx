import { useState, useEffect, useReducer, FC, ChangeEvent } from "react";
import "./App.css";
import { List } from "./components/list/List";
import { ReusableComponentsP96 } from "./components/exercises/reusable_components/ReusableComponentsP96";
import { getAsyncStories, Story } from "./data";
import { InputWithLabel } from "./components/InputWithLabel";
import { Slider } from "./components/exercises/Slider";

const userStorageState = (key: string, initialState: string) => {
	const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);
	useEffect(() => {
		localStorage.setItem(key, value);
	}, [value, key]);
	return [value, setValue] as const;
};

type Stories = Story[];

enum ActionType {
	STORIES_FETCH_INIT = "STORIES_FETCH_INIT",
	STORIES_FETCH_SUCCESS = "STORIES_FETCH_SUCCESS",
	REMOVE_STORY = "REMOVE_STORY",
	STORIES_FETCH_FAILURE = "STORIES_FETCH_FAILURE",
}

type StoriesFetchSuccessAction = {
	type: "STORIES_FETCH_SUCCESS";
	payload: Stories;
};

type StoriesRemoveAction = {
	type: "REMOVE_STORY";
	payload: Story;
};

type StoriesFetchInitAction = {
	type: "STORIES_FETCH_INIT";
};

type StoriesFetchFailureAction = {
	type: "STORIES_FETCH_FAILURE";
};

type StoriesState = {
	data: Stories;
	isLoading: boolean;
	isError: boolean;
};

type StoriesAction =
	| StoriesFetchSuccessAction
	| StoriesRemoveAction
	| StoriesFetchInitAction
	| StoriesFetchFailureAction;

const storiesReducer = (state: StoriesState, action: StoriesAction) => {
	switch (action.type) {
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
				data: action.payload,
			};

		case ActionType.STORIES_FETCH_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
			};

		case ActionType.REMOVE_STORY:
			const newStories = state.data.filter(
				(story: Story) => action.payload.objectID !== story.objectID
			);
			return { ...state, data: newStories };
		default:
			throw new Error();
	}
};
const App: FC = () => {
	const [searchTerm, setSearchTerm] = userStorageState("search", "React");
	const [stories, dispatchStories] = useReducer(storiesReducer, {
		data: [],
		isLoading: false,
		isError: false,
	});

	useEffect(() => {
		if (!searchTerm) return;
		dispatchStories({
			type: ActionType.STORIES_FETCH_INIT,
		});

		const API_ENDPOINT = `https://hn.algolia.com/api/v1/search?query=${searchTerm}`;
		getAsyncStories(API_ENDPOINT)
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
	}, [searchTerm]);

	const handleRemoveItem = (item: Story) => {
		dispatchStories({
			type: ActionType.REMOVE_STORY,
			payload: item,
		});
	};

	const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchTerm(value);
	};

	return (
		<div className="top-wrapper">
			<InputWithLabel
				id="search"
				label="Search"
				value={searchTerm}
				isFocused
				onInputChange={handleSearch}
			>
				<strong>Search:</strong>
			</InputWithLabel>

			<hr />

			{stories.isError && <p>Something went wrong ...</p>}

			{stories.isLoading ? (
				<p>Loading</p>
			) : (
				<List list={stories.data} onRemoveItem={handleRemoveItem} />
			)}
			<Slider />
			<ReusableComponentsP96 />
		</div>
	);
};

export { App };
