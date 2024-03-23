import { useRef } from "react";
import { getPercentage, getLeft } from "./Slider";

const Slider = () => {
	const thumbRef = useRef<HTMLDivElement>(null);
	const sliderRef = useRef<HTMLDivElement>(null);
	const diff = useRef<number | null>(null);

	const handleMouseMove = (event: MouseEvent) => {
		if (thumbRef.current && diff.current && sliderRef.current) {
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
		}
	};

	const handleMouseUp = () => {
		document.removeEventListener("mouseup", handleMouseUp);
		document.removeEventListener("mousemove", handleMouseMove);
	};

	const handleMouseDown = (event: MouseEvent) => {
		if (thumbRef.current && diff.current && sliderRef.current) {
			diff.current =
				event.clientX - thumbRef.current.getBoundingClientRect().left;

			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}
	};

	return (
		<>
			<div ref={sliderRef} className="slider" onMouseDown={handleMouseDown}>
				<div
					ref={thumbRef}
					className="thumb"
					onMouseDown={handleMouseDown}
				></div>
			</div>
		</>
	);
};
