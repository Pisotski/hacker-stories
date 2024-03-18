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

export const data = [superHeroes, superVillains, superPeople];
