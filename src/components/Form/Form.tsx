import { InputWithLabel } from "../InputWithLabel";
import { FC, FormEvent } from "react";

type SearchFormProps = {
	searchTerm: string;
	onSearchInput: (e: FormEvent<HTMLInputElement>) => void;
	onSearchSubmit: (e: FormEvent) => void;
};

const SearchForm: FC<SearchFormProps> = ({
	searchTerm,
	onSearchInput,
	onSearchSubmit,
}) => {
	return (
		<form onSubmit={onSearchSubmit}>
			<InputWithLabel
				id="search"
				label="Search"
				value={searchTerm}
				isFocused
				onInputChange={onSearchInput}
			>
				<strong>Search:</strong>
			</InputWithLabel>

			<button type="submit" disabled={!searchTerm}>
				Submit
			</button>
		</form>
	);
};

export { SearchForm };
