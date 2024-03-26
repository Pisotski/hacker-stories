export type mockDataCharacter = {
	id: string;
	name: string;
};

export type mockDataCharacterSet = mockDataCharacter[];

const superHeroes: mockDataCharacterSet = [
	{ id: "1", name: "Batman" },
	{ id: "2", name: "Iron-Man" },
	{ id: "3", name: "Invincible" },
	{ id: "4", name: "One-Punch Man" },
];

const superVillains: mockDataCharacterSet = [
	{ id: "11", name: "Joker" },
	{ id: "22", name: "Thanos" },
	{ id: "33", name: "Viltramites" },
];

const superPeople: mockDataCharacterSet = [
	{ id: "111", name: "Arnold Schwarzenegger" },
	{ id: "222", name: "Ronny Coleman" },
	{ id: "33", name: "Chris Bumstead" },
];

export interface Story {
	title: string;
	url: string;
	author: string;
	num_comments: number;
	points: number;
	objectID: number;
}

export const stories: Story[] = [
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

export const getData = (): Promise<{ data: { initialStories: Story[] } }> => {
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve({ data: { initialStories: stories } });
		}, 200)
	);
};

export const data = [superHeroes, superVillains, superPeople];
