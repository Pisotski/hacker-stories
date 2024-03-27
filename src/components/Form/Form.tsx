import { InputWithLabel } from "../InputWithLabel";
import { FC, ChangeEvent } from "react";

type SearchFormProps = {
	searchTerm: string;
	onSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
	onSearchSubmit: () => void;
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
