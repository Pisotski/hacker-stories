import { FC, Fragment } from "react";
import { Item } from "./Item";
import { Story } from "../../data";

interface ListProps {
	list: Story[];
	handleRemoveItem: (item: Story) => void;
}
const List: FC<ListProps> = ({ list, handleRemoveItem }) => (
	<div>
		{list.map((item: Story) => (
			<Fragment key={item.objectID}>
				<Item item={item} handleRemoveItem={handleRemoveItem} />
			</Fragment>
		))}
	</div>
);

export { List };
