import "./Slider.css";
import { useState, useEffect, useRef } from "react";

const getPercentage = (current, max) => (100 * current) / max;

const getLeft = (percentage) => `calc(${percentage}% - 5px)`;

const Slider = () => {
	const thumbRef = useRef();
	const sliderRef = useRef();
	const diff = useRef();

	const handleMouseMove = (event) => {
		let newX =
			event.clientX -
			diff.current -
			sliderRef.current.getBoundingClientRect().left;

		const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;

		const start = 0;

		if (newX < start) {
			newX = 0;
		}

		if (newX > end) {
			newX = end;
		}

		const newPercentage = getPercentage(newX, end);

		thumbRef.current.style.left = getLeft(newPercentage);
	};
	const handleOnMouseUp = () => {
		document.removeEventListener("mouseup", handleOnMouseUp);
		document.removeEventListener("mousemove", handleMouseMove);
	};

	const handleOnMouseDown = (event) => {
		diff.current =
			event.clientX - thumbRef.current.getBoundingClientRect().left;

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleOnMouseUp);
	};

	return (
		<>
			<div ref={sliderRef} className="slider" onMouseDown={handleOnMouseDown}>
				<div
					ref={thumbRef}
					onMouseDown={handleOnMouseDown}
					className="thumb"
				></div>
			</div>
		</>
	);
};

export { Slider };
