import { FC } from "react";
import { Story } from "../../App";

type ItemProps = Omit<Story, "objectID">;

const Item: FC<ItemProps> = ({ url, title, author, num_comments, points }) => (
	<ul className="technology">
		<a href={url}>{title}</a>
		<li>Author: {author}</li>
		<li>Comments: {num_comments}</li>
		<li>Points: {points}</li>
	</ul>
);

export { Item };
