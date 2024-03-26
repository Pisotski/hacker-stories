import { FC, Fragment } from "react";
import { Item } from "./Item";
import { Story } from "../../data";

interface ListProps {
	list: Story[];
	onRemoveItem: (item: Story) => void;
}
const List: FC<ListProps> = ({ list, onRemoveItem }) => (
	<div>
		{list.map((item: Story) => (
			<Fragment key={item.objectID}>
				<Item item={item} onRemoveItem={onRemoveItem} />
			</Fragment>
		))}
	</div>
);

export { List };
