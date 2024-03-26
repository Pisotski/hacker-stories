import { FC } from "react";
import { Story } from "../../data";
import { Button } from "../exercises/reusable_components/Button";

type ItemProps = {
	item: Story;
	onRemoveItem: (item: Story) => void;
};
// The application renders a list of items and allows
// its users to filter the list via a search feature.
const Item: FC<ItemProps> = ({ item, onRemoveItem }) => {
	const { url, title, author, num_comments, points } = item;

	return (
		<>
			<ul className="technology">
				<span>
					<Button
						type="button"
						values={{ trueValue: "x" }}
						onClick={() => onRemoveItem(item)}
					/>
				</span>
				<a href={url}>{title}</a>
				<li>Author: {author}</li>
				<li>Comments: {num_comments}</li>
				<li>Points: {points}</li>
			</ul>
		</>
	);
};

export { Item };
