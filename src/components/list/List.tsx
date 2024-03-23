import { FC, Fragment } from "react";
import { Item } from "./Item";
import { Story } from "../../data";
import { Button } from "../exercises/reusable_components/Button";

interface ListProps {
	list: Story[];
	setStories: (filteredStories: Story[]) => void;
}
const List: FC<ListProps> = ({ list, setStories }) => (
	<div>
		{list.map(({ objectID, ...item }) => (
			<Fragment key={objectID}>
				<Item {...item} />
				<Button
					type="button"
					values={{ trueValue: "x" }}
					onClick={() => {
						const filteredStories = list.filter(
							(story) => story.title !== item.title
						);
						setStories(filteredStories);
					}}
				></Button>
			</Fragment>
		))}
	</div>
);

export { List };
