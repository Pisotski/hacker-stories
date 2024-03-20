import { FC } from "react";
import { Item } from "./Item";
import { Story } from "../../App";

interface ListProps {
	list: Story[];
}
const List: FC<ListProps> = ({ list }) => (
	<div>
		{list.map(({ objectID, ...item }) => (
			<Item key={objectID} {...item} />
		))}
	</div>
);

export { List };
