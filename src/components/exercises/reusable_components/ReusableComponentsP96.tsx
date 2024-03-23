import { data } from "../../../data";
import { getRandomIntInclusive } from "../../../helpers";
import { InputGroup } from "./InputGroup";
import { Button } from "./Button";
import { PreventTouchEnd } from "../PreventTouchEnd";

const buttonValues = {
	trueValue: "Like",
	falseValue: "Dislike",
};

const ReusableComponentsP96 = () => {
	return (
		<>
			{data.map((mockDataCharacterSet, index) => (
				<div
					className="practice-reusable-components-p96"
					key={getRandomIntInclusive(0, 1000)}
				>
					<InputGroup
						type="radio"
						inputGroupName={"selected-answer-" + index}
						data={mockDataCharacterSet}
					/>
					<Button type="button" values={buttonValues} />
				</div>
			))}
			<InputGroup type="checkbox" data={data[0]} />
			<PreventTouchEnd />
		</>
	);
};

export { ReusableComponentsP96 };
