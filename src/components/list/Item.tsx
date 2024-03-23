import { FC } from "react";
import { Story } from "../../data";
import { Button } from "../exercises/reusable_components/Button";

type ItemProps = Omit<Story, "objectID">;
// The application renders a list of items and allows
// its users to filter the list via a search feature.
const Item: FC<ItemProps> = ({ url, title, author, num_comments, points }) => (
	<>
		<ul className="technology">
			<a href={url}>{title}</a>
			<li>Author: {author}</li>
			<li>Comments: {num_comments}</li>
			<li>Points: {points}</li>
		</ul>
		{/* <Button /> */}
	</>
);

export { Item };
