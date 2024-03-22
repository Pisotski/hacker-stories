import "./Slider.css";
import { useState, useEffect, useRef } from "react";
const Slider = () => {
	const [currentMousePosition, setCurrentMousePosition] = useState(100);

	const pointer = useRef();
	const bar = useRef();

	function handleOnMouseDown(event) {
		setCurrentMousePosition(event.clientX);
	}
	useEffect(() => {
		const { x } = bar.current.getBoundingClientRect();
		setCurrentMousePosition(x);
	}, []);

	useEffect(() => {
		console.log();
		pointer.current.style.position = "absolute";
		pointer.current.style.transform = `translateX(${
			currentMousePosition - 5
		}px)`;
	}, [currentMousePosition]);

	return (
		<>
			<div ref={bar} className="bar" onDrag={handleOnMouseDown}>
				<div
					ref={pointer}
					onMouseDown={handleOnMouseDown}
					className="pointer"
				></div>
			</div>
		</>
	);
};

export { Slider };
